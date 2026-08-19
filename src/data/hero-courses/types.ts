/**
 * A course shown on one of the homepage hero's floating cards.
 *
 * A near-twin of `HomepageCategoryCourse`, since the hero endpoint's serializer
 * extends the one the category tabs use — but no longer identical to it, and
 * kept separate for exactly that reason: the two endpoints answer different
 * questions, so only the hero carries the fields the hero renders.
 */
export interface HeroCourse {
  courseId: string;
  title: string;
  imageUrl: string | null;
  /** Institution offering the course: its center, or its partner. */
  providerName: string | null;
  providerLogo: string | null;
  /**
   * Whether to mark the card as a recently added course. Staff set this as a
   * date on the backend, which sends false once the date has passed — the
   * comparison is deliberately not made here, so the badge cannot be thrown off
   * by a visitor's system clock.
   *
   * Required rather than optional because the endpoint always sends it. The
   * render guard treats a missing value as false anyway, so an MFE deployed
   * ahead of the plugin degrades to no badge rather than breaking.
   */
  isNew: boolean;
}
