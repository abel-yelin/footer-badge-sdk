import { FOOTER_BADGES_CACHE_TAG } from '../constants';
import type { HandleFooterBadgesRevalidateOptions } from '../types';

interface FooterBadgesRequestLike {
  headers: {
    get(name: string): string | null;
  };
  nextUrl: {
    searchParams: URLSearchParams;
  };
}

interface FooterBadgesResponseFactory {
  json(body: unknown, init?: { status?: number }): Response;
}

export async function handleFooterBadgesRevalidate(
  request: FooterBadgesRequestLike,
  responseFactory: FooterBadgesResponseFactory,
  options: HandleFooterBadgesRevalidateOptions
) {
  const configuredToken =
    options.token ?? process.env.FOOTER_BADGES_REVALIDATE_TOKEN;

  if (!configuredToken) {
    return responseFactory.json(
      { error: 'FOOTER_BADGES_REVALIDATE_TOKEN is not configured.' },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;
  const requestToken =
    bearerToken ?? request.nextUrl.searchParams.get('token') ?? '';

  if (requestToken !== configuredToken) {
    return responseFactory.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const cacheTag = options.tag ?? FOOTER_BADGES_CACHE_TAG;
  await options.revalidate(cacheTag);

  return responseFactory.json({
    revalidated: true,
    tag: cacheTag,
    now: new Date().toISOString(),
  });
}
