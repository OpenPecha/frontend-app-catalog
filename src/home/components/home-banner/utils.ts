import type { AuthenticatedUserTypes } from '@src/header/types';

/**
 * Returns the name to greet a signed-in user by, capitalised: the first word of
 * their full name, or their username when there is no name to read.
 *
 * The platform stores one free-text full name and no separate given name, so the
 * first word is the closest available approximation. That is imperfect in two
 * known ways: a compound given name is clipped, so "maria jesus Gutierrez"
 * greets as "Maria"; and many Tibetan names carry no family name at all, so
 * dropping the second word of "Karma Dolma" trims one personal name rather than
 * a surname. Both are accepted over greeting everyone by a raw username.
 *
 * Splitting on runs of whitespace and discarding the blanks means a name that is
 * empty, padded, or doubly spaced still resolves cleanly, and a name written
 * without spaces — as CJK and some Tibetan names are — passes through whole.
 */
export const getGreetingName = (
  user: Pick<AuthenticatedUserTypes, 'name' | 'username'>,
): string => {
  const [firstWord] = (user.name ?? '').split(/\s+/).filter(Boolean);

  // `||` rather than `??` on the way out: TypeScript types the destructured
  // element as a plain string, so a nullish check reads as dead code, and `||`
  // also catches an empty first element should the filter above ever be dropped.
  const greeting = firstWord || user.username;

  // Only the first character is touched, so a name the learner entered in caps
  // keeps its shape and one written in a caseless script is left alone. Lodash's
  // `capitalize` is deliberately not used here: it lowercases the remainder,
  // which would turn "JP" into "Jp".
  return greeting.charAt(0).toUpperCase() + greeting.slice(1);
};
