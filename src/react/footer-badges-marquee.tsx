import type { FooterBadgesMarqueeProps } from '../types';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function FooterBadgesMarquee({
  badges,
  className,
  listClassName,
  itemClassName,
  textClassName,
  imageClassName,
  pauseOnHover = true,
  durationSeconds,
}: FooterBadgesMarqueeProps) {
  if (badges.length === 0) {
    return null;
  }

  const marqueeBadges = [...badges, ...badges];
  const resolvedDurationSeconds = durationSeconds ?? Math.max(28, badges.length * 4);

  return (
    <div
      className={joinClasses(
        'group flex min-w-0 max-w-full items-center overflow-hidden whitespace-nowrap',
        className
      )}
    >
      <style>{`
        @keyframes footer-badge-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div
        className={joinClasses(
          'flex w-max min-w-max items-center gap-2',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          listClassName
        )}
        style={{
          animation: `footer-badge-marquee ${resolvedDurationSeconds}s linear infinite`,
        }}
      >
        {marqueeBadges.map((badge, index) => (
          <a
            key={`${badge.href}-${index}`}
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={badge.alt}
            className={joinClasses(
              'inline-flex h-[1.6em] shrink-0 items-center leading-none opacity-90 transition-opacity hover:opacity-100',
              itemClassName
            )}
          >
            {badge.src ? (
              <img
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                loading="lazy"
                decoding="async"
                className={joinClasses(
                  'block h-full w-auto object-contain',
                  imageClassName
                )}
              />
            ) : (
              <span
                className={joinClasses(
                  'inline-flex h-full items-center rounded-full border border-current/20 px-2 text-[0.75rem] leading-none underline-offset-4 hover:underline',
                  textClassName
                )}
              >
                {badge.label ?? badge.alt}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
