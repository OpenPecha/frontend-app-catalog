import { useContext, useEffect, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { useMediaQuery } from '@openedx/paragon';

import type { AppContextTypes } from '@src/header/types';
import { useHeroCourses } from '@src/data/hero-courses/hooks';
import { HERO_CARD_COUNT, HERO_CARD_SWAP_INTERVAL_MS } from '@src/data/hero-courses/constants';
import HomeHeroCard from './HomeHeroCard';
import messages from './messages';

/**
 * The pair of floating course cards beside the hero heading.
 *
 * The two cards trade places on a timer, so whichever is in front changes every
 * few seconds.
 */
const HomeHeroCards = () => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext) as AppContextTypes;
  const { data } = useHeroCourses();
  const [isSwapped, setIsSwapped] = useState(false);

  const prefersReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });
  const courses = (data ?? []).slice(0, HERO_CARD_COUNT);
  // Nothing to trade places with unless both cards are there.
  const canSwap = courses.length === HERO_CARD_COUNT && !prefersReducedMotion;

  useEffect(() => {
    if (!canSwap) {
      return undefined;
    }

    const timer = setInterval(
      () => setIsSwapped((swapped) => !swapped),
      HERO_CARD_SWAP_INTERVAL_MS,
    );

    return () => clearInterval(timer);
  }, [canSwap]);

  // The hero is chrome around a working search box, so it stays quiet when it
  // has nothing to show: no skeleton while loading, and no error state if the
  // request fails. Either would draw the eye to a decorative corner of the page.
  if (!courses.length) {
    return null;
  }

  return (
    <div
      className="home-hero__visual"
      role="group"
      aria-label={intl.formatMessage(messages.heroCourses)}
      data-testid="home-hero-cards"
    >
      {courses.map((course, index) => (
        <HomeHeroCard
          key={course.courseId}
          course={course}
          // The first card leads until the timer flips them, and with only one
          // card it is always the one in front.
          isFront={courses.length === 1 || (index === 0) !== isSwapped}
          isSignedIn={Boolean(authenticatedUser)}
        />
      ))}
    </div>
  );
};

export default HomeHeroCards;
