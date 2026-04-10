import type { FooterBadge, FooterBadgesRemoteConfig } from '../types';
import { isFooterBadge } from './validate-footer-badges';

export function extractProjectFooterBadges(
  payload: unknown,
  projectId: string
): FooterBadge[] {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Remote footer badge config is not an object.');
  }

  const config = payload as FooterBadgesRemoteConfig;
  const projectBadges = config.projects?.[projectId];

  if (!Array.isArray(projectBadges)) {
    throw new Error(`No footer badge config found for project "${projectId}".`);
  }

  const badges = projectBadges.filter(isFooterBadge);

  if (badges.length !== projectBadges.length) {
    throw new Error(
      `Footer badge config for project "${projectId}" is invalid.`
    );
  }

  return badges;
}
