# @luolink/footer-badges

`@luolink/footer-badges` is a small SDK for rendering remotely managed footer badges in Next.js projects.

It handles four things:

- fetch remote `badges.json` at runtime
- extract and validate badges for a specific `projectId`
- render a single-line scrolling badge rail
- expose a reusable revalidate handler for cache refresh

## Install

```bash
pnpm add @luolink/footer-badges
```

## Exports

- `FOOTER_BADGES_CACHE_TAG`
- `isFooterBadge()`
- `extractProjectFooterBadges()`
- `getRemoteFooterBadges()`
- `handleFooterBadgesRevalidate()`
- `FooterBadgesMarquee`

## Footer Badge Shape

```ts
type FooterBadge = {
  href: string;
  alt: string;
  src?: string;
  width?: number;
  height?: number;
  label?: string;
  target?: string;
  rel?: string;
};
```

Each badge must resolve to either:

- an image badge via `src`
- a text badge via `label`

## Load Remote Badges

```ts
import { getRemoteFooterBadges } from '@luolink/footer-badges';

const badges = await getRemoteFooterBadges({
  configUrl: process.env.FOOTER_BADGES_CONFIG_URL,
  projectId: process.env.FOOTER_BADGES_PROJECT_ID ?? 'stampmaker',
  fallbackBadges: [],
  revalidateSeconds: 3600,
});
```

## Render In React

```tsx
import { FooterBadgesMarquee } from '@luolink/footer-badges';

<FooterBadgesMarquee badges={badges} className="w-full" />
```

The marquee keeps a single scrolling row by default and normalizes badge display with:

- fixed badge height
- max badge width
- image `object-contain`
- safe default link behavior using `_blank` and `noopener noreferrer`

Optional display props:

```tsx
<FooterBadgesMarquee
  badges={badges}
  badgeHeightPx={36}
  badgeMaxWidthPx={176}
  durationSeconds={40}
/>
```

## Fallback Config

Keep a local fallback so footer rendering does not depend entirely on the remote config being available.

```ts
import type { FooterBadge } from '@luolink/footer-badges';

export const FOOTER_BADGES_FALLBACK: FooterBadge[] = [];
```

## Revalidate Route

```ts
import { handleFooterBadgesRevalidate } from '@luolink/footer-badges';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return handleFooterBadgesRevalidate(request, NextResponse, {
    revalidate: (tag) => revalidateTag(tag, 'max'),
  });
}
```

## Required Environment Variables

```env
FOOTER_BADGES_CONFIG_URL=https://abel-yelin.github.io/footer-badges-hub/badges.json
FOOTER_BADGES_PROJECT_ID=your-project-id
FOOTER_BADGES_REVALIDATE_SECONDS=3600
FOOTER_BADGES_REVALIDATE_TOKEN=replace-with-your-token
```

## Recommended Setup

- use `footer-badges-hub` as the remote badge config source
- use this SDK in each consuming Next.js site
- keep the site's existing footer and only attach the badge rail

## Build

```bash
npm run build
```
