/**
 * The hero shows a fixed pair of floating cards.
 */
export const HERO_CARD_COUNT = 2;

/**
 * How long the front and back cards trade places, in milliseconds.
 */
export const HERO_CARD_SWAP_INTERVAL_MS = 3000;

/**
 * A visitor's enrollments only change when they enroll, so hold the fetched
 * pair long enough to survive remounts and window refocus. Without this the
 * app-wide query defaults (`staleTime: 0`, `refetchOnWindowFocus: true`) would
 * refetch this per-user endpoint every time the tab regains focus.
 */
export const HERO_COURSES_STALE_TIME_MS = 5 * 60 * 1000;
