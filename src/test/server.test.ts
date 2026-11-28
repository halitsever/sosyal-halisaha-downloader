import { test } from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('a port in use stops the app with a clear error and a non-zero exit code', async (t) => {
    const blocker = net.createServer();
    await new Promise<void>((resolve) => blocker.listen(0, resolve));
    t.after(() => blocker.close());
    const port = (blocker.address() as net.AddressInfo).port;

    const app = spawn(process.execPath, ['src/index.ts'], { cwd: root, env: { ...process.env, PORT: String(port) } });
    t.after(() => app.kill());
    let output = '';
    app.stdout.on('data', (chunk) => (output += chunk));
    app.stderr.on('data', (chunk) => (output += chunk));

    const code = await new Promise<number | null>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`app did not exit, output: ${output}`)), 10_000);
        app.on('exit', (exitCode) => {
            clearTimeout(timer);
            resolve(exitCode);
        });
    });

    assert.notEqual(code, 0, output);
    assert.match(output, new RegExp(`Port ${port} is already in use`));
    assert.doesNotMatch(output, /Server is running/);
});
