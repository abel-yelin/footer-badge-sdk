import { FOOTER_BADGES_CACHE_TAG } from '../constants';
import { extractProjectFooterBadges } from '../core/extract-project-footer-badges';
import type { FooterBadge, GetRemoteFooterBadgesOptions } from '../types';

export async function getRemoteFooterBadges({
  configUrl,
  projectId,
  fallbackBadges,
  revalidateSeconds = 3600,
  cacheTag = FOOTER_BADGES_CACHE_TAG,
}: GetRemoteFooterBadgesOptions): Promise<FooterBadge[]> {
  if (!configUrl) {
    return fallbackBadges;
  }

  try {
    const response = await fetch(configUrl, {
      next: {
        revalidate: revalidateSeconds,
        tags: [cacheTag],
      },
      headers: {
        Accept: 'application/json',
      },
    } as RequestInit & {
      next: {
        revalidate: number;
        tags: string[];
      };
    });

    if (!response.ok) {
      throw new Error(
        `Remote footer badge request failed with status ${response.status}.`
      );
    }

    const payload = (await response.json()) as unknown;
    return extractProjectFooterBadges(payload, projectId);
  } catch {
    return fallbackBadges;
  }
}
