import { getConfig } from '@edx/frontend-platform';

/**
 * URL to check whether a course is on the current user's wishlist.
 */
export const getWishlistStatusUrl = (
  courseId: string,
) => `${getConfig().LMS_BASE_URL}/api/wishlist/status/?course_ids=${encodeURIComponent(courseId)}`;

/**
 * URL to add a course to the current user's wishlist.
 */
export const getWishlistListCreateUrl = () => `${getConfig().LMS_BASE_URL}/api/wishlist/`;

/**
 * URL to remove a course from the current user's wishlist.
 */
export const getWishlistDetailUrl = (
  courseId: string,
) => `${getConfig().LMS_BASE_URL}/api/wishlist/${encodeURIComponent(courseId)}/`;
