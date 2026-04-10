export { FOOTER_BADGES_CACHE_TAG } from './constants';

export type {
  FooterBadge,
  FooterBadgesRemoteConfig,
  GetRemoteFooterBadgesOptions,
  HandleFooterBadgesRevalidateOptions,
  FooterBadgesMarqueeProps,
} from './types';

export { isFooterBadge } from './core/validate-footer-badges';
export { extractProjectFooterBadges } from './core/extract-project-footer-badges';

export { getRemoteFooterBadges } from './next/get-remote-footer-badges';
export { handleFooterBadgesRevalidate } from './next/handle-footer-badges-revalidate';

export { FooterBadgesMarquee } from './react/footer-badges-marquee';
