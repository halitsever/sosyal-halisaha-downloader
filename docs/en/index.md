---
title: Self-hosted football match recording downloader (Node.js)
description: Unofficial, self-hosted Node.js web app (Express, EJS) for saving your own football match recordings. How it works, how to run it. Not an official tool.
sidebar: false
---

# Save your own football match recordings, self-hosted

Sosyal Halisaha Downloader is a small Node.js web app that you run yourself. You paste the URL of a match page, the app shows the recording with its title and uploader, and your browser saves it as `match-record.mp4`.

::: warning Unofficial
This project is not an official tool and is not affiliated with or endorsed by sosyalhalisaha.com. It is meant for education and personal use: archiving publicly available recordings of your own matches. Downloading, sharing or archiving content that is not yours may violate the platform's terms of use and copyright or data protection law.
:::

The rest of this site is in Turkish, because the people who use the tool play amateur football in Turkey. This page is the summary for developers.

## Run it

You need Node.js 24 LTS. The repository has no build step: `npm start` runs `node src/index.ts` through Node's built-in TypeScript type stripping. Some Node 22 builds fail with `ERR_UNKNOWN_FILE_EXTENSION`.

```bash
git clone https://github.com/halitsever/sosyal-halisaha-downloader.git
cd sosyal-halisaha-downloader
npm i
npm start
```

The server logs `Server is running on 3000 port`. Open `http://localhost:3000`. Set `PORT` to listen elsewhere:

```bash
PORT=8080 npm start
```

There is no login. Anyone who can reach the port can make the server fetch an `https://` URL, so keep it on your own machine or a network you trust.

## How it works

The whole server is `src/index.ts`, an Express 5 app with EJS views and two routes.

| Route | What it does |
| --- | --- |
| `GET /` | Renders the form with the URL field. |
| `POST /download` | Reads `videoUrl`, scrapes the page and renders the preview page. |

The scraper in `src/scraper/` fetches the page once with axios (browser-like headers, 60 second timeout) and parses it with jsdom. The only URL check is the `https://` prefix. There is no domain allowlist, on purpose.

The parser reads four things from the page:

| Selector | Value |
| --- | --- |
| `.video-player script` | A `const videoSrc = [...]` literal. The first item's `url` is the video file. |
| `.title h3` | Match title |
| `.owner a` | Uploader |
| `picture img` | Thumbnail |

The video file never passes through the server. The preview page points a `<video>` element at the file's own URL, and the Download button clicks a link to it with `download="match-record.mp4"`. Nothing is stored: there is no database and no history.

## When it breaks

The scraper depends on third-party markup. If the page changes, the error page shows `Script content not found` or `Video script not found`. Check the selectors and the regular expression in `src/scraper/video.parser.ts` first.

## Contributing

There is no test suite. CI runs `npm ci`, `npm run typecheck` and a smoke test that starts the server and requests `/`. Open pull requests against `main`. The code is MIT licensed.

- [Source on GitHub](https://github.com/halitsever/sosyal-halisaha-downloader)
- [Issues](https://github.com/halitsever/sosyal-halisaha-downloader/issues)
- [Turkish guide: installation](/kurulum)
