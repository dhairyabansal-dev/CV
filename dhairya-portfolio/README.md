This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## GitHub-driven projects

Public, non-fork repositories under `dhairyabansal-dev` are pulled live from
the GitHub REST API and shown in the Projects and Build Log sections —
`lib/github.ts` is the whole data layer. Publish a new public repo and it
shows up here on its own, no edit to `portfolio-data.ts` required.

- **Classification** (`lib/project-classification.ts`): optional per-repo
  overrides for ticker, title, category, priority, and featured/hidden
  state, keyed by repo name. A repo with no entry still shows up, with a
  ticker/category generated from its name and primary language.
- **Caching**: fetches are cached for 30 minutes via Next's `fetch`
  `next.revalidate`, so GitHub changes show up automatically without a
  redeploy, without hitting the API on every page load.
- **Fallback**: if GitHub is unreachable, the Projects/Build Log sections
  fall back to a small static project list (`fallbackProjects` in
  `lib/project-classification.ts`) instead of going blank.
- **Project pages**: `/projects/[repo]` renders a repo's README (via
  `react-markdown` + `remark-gfm`, no raw HTML — same sanitization
  guarantees either way) plus metadata, topics, and links.
- **Auth**: works unauthenticated (60 req/hr shared GitHub limit). Set
  `GITHUB_TOKEN` (see `.env.example`) to raise that to 5,000/hr — never
  required, never exposed to the client, never returns private repos
  regardless of token scope.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
