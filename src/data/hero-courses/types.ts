/**
 * A course shown on one of the homepage hero's floating cards.
 *
 * Similar to `HomepageCategoryCourse` but not identical — kept as its own type
 * since the two endpoints are free to diverge.
 */
export interface HeroCourse {
  courseId: string;
  title: string;
  imageUrl: string | null;
  /** Institution offering the course: its center, or its partner. */
  providerName: string | null;
  providerLogo: string | null;
  /** Whether to show a "new course" badge. The backend decides this by date. */
  isNew: boolean;
}
