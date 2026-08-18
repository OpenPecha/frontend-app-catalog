import { camelCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getHttpClient } from '@edx/frontend-platform/auth';

import { getHeroCoursesUrl } from './urls';
import type { HeroCourse } from './types';

/**
 * Fetches the courses for the homepage hero cards.
 *
 * Unlike the other homepage endpoints, this one answers differently depending
 * on who is asking, so neither HTTP client works for both audiences and the
 * caller's sign-in state picks between them:
 *
 * - Signed in, the authenticated client is required. It is the only one that
 *   sets `withCredentials`, without which the browser sends no cookies to the
 *   LMS on a cross-origin request and the visitor would look anonymous.
 * - Signed out, the plain client is required. The authenticated client's
 *   interceptor asks for a JWT first and rejects the request outright when
 *   there is no token to get, so the call would never reach the server — and
 *   the curated cards a signed-out visitor is meant to see would never load.
 */
export const fetchHeroCourses = async (isAuthenticated: boolean): Promise<HeroCourse[]> => {
  const httpClient = isAuthenticated ? getAuthenticatedHttpClient() : getHttpClient();
  const { data } = await httpClient.get(getHeroCoursesUrl());

  return camelCaseObject(Array.isArray(data) ? data : []);
};
