import type { FooterBadge } from '../types';

export function isFooterBadge(value: unknown): value is FooterBadge {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const badge = value as Record<string, unknown>;
  const hasImage = typeof badge.src === 'string';
  const hasLabel = typeof badge.label === 'string';

  if (typeof badge.href !== 'string' || typeof badge.alt !== 'string') {
    return false;
  }

  if (!hasImage && !hasLabel) {
    return false;
  }

  if (
    badge.width !== undefined &&
    (typeof badge.width !== 'number' || !Number.isFinite(badge.width))
  ) {
    return false;
  }

  if (
    badge.height !== undefined &&
    (typeof badge.height !== 'number' || !Number.isFinite(badge.height))
  ) {
    return false;
  }

  return true;
}
