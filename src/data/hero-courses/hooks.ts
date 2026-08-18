import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppContext } from '@edx/frontend-platform/react';

import type { AppContextTypes } from '@src/header/types';
import { fetchHeroCourses } from './api';
import { HERO_COURSES_STALE_TIME_MS } from './constants';
import type { HeroCourse } from './types';

/**
 * Loads the courses for the homepage hero cards.
 *
 * Reads the user from context rather than calling `getAuthenticatedUser()`, so
 * the hook re-runs once the user resolves — a plain module call would not
 * re-render and the hero would stay stuck on the signed-out response.
 */
export const useHeroCourses = () => {
  const { authenticatedUser } = useContext(AppContext) as AppContextTypes;
  const isAuthenticated = Boolean(authenticatedUser);

  return useQuery<HeroCourse[], Error>({
    // The username belongs in the key because this response is per-user:
    // keyed on 'heroCourses' alone, the pair cached for a signed-out visitor
    // would be reused after they sign in, and one learner's courses could be
    // served to the next user of a shared browser.
    queryKey: ['heroCourses', authenticatedUser?.username ?? null],
    queryFn: () => fetchHeroCourses(isAuthenticated),
    staleTime: HERO_COURSES_STALE_TIME_MS,
  });
};
