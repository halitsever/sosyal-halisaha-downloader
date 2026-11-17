# AGENTS.md

Sosyal Halisaha Downloader is an unofficial, self-hosted Express and EJS web app that people run to save their own football match recordings from sosyalhalisaha.com match pages. It is not affiliated with that site.

## Verify a change

CI (`.github/workflows/ci.yml`, Node LTS) has no test suite. It runs:

- `npm ci`
- `npm run typecheck` (`tsc --noEmit`)
- `PORT=3000 npm start &`, then a smoke test that `curl http://localhost:3000/` answers within 20 seconds.

## Gotchas

- There is no build step. `npm start` runs `node src/index.ts` through Node's built-in TypeScript type stripping, so it needs a Node that has it enabled (CI's LTS, Node 24, works; some Node 22 builds fail with `ERR_UNKNOWN_FILE_EXTENSION`). Write relative imports with the `.ts` extension, import types with `import type`, and avoid TS-only runtime syntax such as enums and namespaces.
- The scraper depends on the markup of the third-party match page: a `.video-player` script holding `const videoSrc = [...]`, plus `.title h3`, `.owner a` and `picture img`. When downloads break, check those selectors in `src/scraper/video.parser.ts` first.
- The scraper is domain-agnostic on purpose. The domain allowlist in `src/config/scraper.config.ts` and `src/scraper/video.scraper.ts` stays commented out; the only URL check is the `https://` prefix.
- Keep the "unofficial, not affiliated" framing in any new user-facing text.
- A `dev` branch exists, but `main` is the default branch and the CI target. Open PRs against `main`.
- `src/test/` holds only a `.gitkeep`.

## Conventions

- Commit subjects in conventional-commit style, in English, subject line only: no body, no trailer.
- Work on a branch and open a PR against `main`. The owner merges.
- Write new text without emoji. Keep code comments short, one line where possible, and say why.
- The README follows the owner's template. Keep every image served from `halitsever-api.vercel.app` byte-for-byte; only the `title=` value of `api/repo-title` and the issue wrapper link may be corrected.
- Leave version bumps and publishing to the owner.
