export interface FooterBadge {
  href: string;
  alt: string;
  src?: string;
  width?: number;
  height?: number;
  label?: string;
  target?: string;
  rel?: string;
}

export interface FooterBadgesRemoteConfig {
  version?: number;
  projects?: Record<string, unknown>;
}

export interface GetRemoteFooterBadgesOptions {
  configUrl?: string;
  projectId: string;
  fallbackBadges: FooterBadge[];
  revalidateSeconds?: number;
  cacheTag?: string;
}

export interface HandleFooterBadgesRevalidateOptions {
  token?: string;
  tag?: string;
  revalidate: (tag: string) => void | Promise<void>;
}

export interface FooterBadgesMarqueeProps {
  badges: FooterBadge[];
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  pauseOnHover?: boolean;
  durationSeconds?: number;
  badgeHeightPx?: number;
  badgeMaxWidthPx?: number;
}
