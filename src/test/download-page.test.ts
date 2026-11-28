import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ejs from 'ejs';
import { JSDOM } from 'jsdom';

const template = path.join(path.dirname(fileURLToPath(import.meta.url)), '../pages/download.ejs');

/** Renders the page, runs its script and returns the link the Download button clicks. */
const clickDownload = async (videoUrl: string) => {
    const html = await ejs.renderFile(template, { data: { video: { videoUrl, title: 'Match', videOwner: 'Owner' } } });
    const clicked: { href?: string; download?: string } = {};
    const alerts: unknown[] = [];
    const dom = new JSDOM(html, {
        runScripts: 'dangerously',
        beforeParse(window) {
            window.HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
                clicked.href = this.getAttribute('href') ?? undefined;
                clicked.download = this.download;
            };
            window.alert = (message?: unknown) => void alerts.push(message);
        },
    });
    dom.window.document.getElementById('downloadBtn')?.click();
    return { clicked, alerts };
};

test('the download link keeps & in the video URL', async () => {
    const url = 'https://cdn.example.com/match.mp4?token=abc&expires=123';
    const { clicked } = await clickDownload(url);
    assert.equal(clicked.href, url);
    assert.equal(clicked.download, 'match-record.mp4');
});

test('a quote or closing script tag in the URL cannot run code', async () => {
    const url = "https://cdn.example.com/a.mp4?x=';alert(1);'</script><script>alert(2)</script>";
    const { clicked, alerts } = await clickDownload(url);
    assert.deepEqual(alerts, []);
    assert.equal(clicked.href, url);
});
