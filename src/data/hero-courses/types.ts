/**
 * A course shown on one of the homepage hero's floating cards.
 *
 * Structurally identical to `HomepageCategoryCourse` today, because both come
 * from the same backend serializer. Kept as its own type rather than shared:
 * the two endpoints answer different questions — one lists a category, the
 * other answers "what should this visitor see" — and are free to diverge.
 */
export interface HeroCourse {
  courseId: string;
  title: string;
  imageUrl: string | null;
  /** Institution offering the course: its center, or its partner. */
  providerName: string | null;
  providerLogo: string | null;
}
