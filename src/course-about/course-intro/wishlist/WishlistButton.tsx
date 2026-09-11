import { useEffect, useState } from 'react';
import { Button } from '@openedx/paragon';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';

import { HeartFilledIcon, HeartFilledPopIcon, HeartLineIcon } from '../icons';
import { getWishlistStatus, addToWishlist, removeFromWishlist } from './api';
import messages from './messages';
import type { WishlistButtonTypes } from './types';

// Hidden entirely for a logged-out visitor rather than redirecting to login
// on click: there's no such thing as an anonymous wishlist (the API requires
// auth), and unlike Enroll, wishlisting isn't the primary reason someone
// would be on this page, so it isn't worth interrupting them for.
export const WishlistButton = ({ courseId }: WishlistButtonTypes) => {
  const intl = useIntl();
  const authenticatedUser = getAuthenticatedUser();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  // Starts false and, unlike isWishlisted, is only ever set by a real click
  // (never by the initial status fetch below) — this is what tells the pop
  // animation apart from a course that simply loaded already-wishlisted.
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (!authenticatedUser) {
      return;
    }

    getWishlistStatus(courseId)
      .then(setIsWishlisted)
      .catch((error) => logError('Failed to fetch wishlist status', error));
  }, [authenticatedUser, courseId]);

  if (!authenticatedUser) {
    return null;
  }

  const handleClick = async () => {
    const nextIsWishlisted = !isWishlisted;
    // Optimistic: flips immediately, reverts silently if the request fails.
    setHasClicked(true);
    setIsWishlisted(nextIsWishlisted);
    setIsPending(true);
    try {
      if (nextIsWishlisted) {
        await addToWishlist(courseId);
      } else {
        await removeFromWishlist(courseId);
      }
    } catch (error) {
      setIsWishlisted(!nextIsWishlisted);
      logError('Failed to update wishlist', error);
    } finally {
      setIsPending(false);
    }
  };

  const heartIcon = (() => {
    if (!isWishlisted) {
      return HeartLineIcon;
    }
    return hasClicked ? HeartFilledPopIcon : HeartFilledIcon;
  })();

  return (
    <Button
      variant="tertiary"
      className="course-about-wishlist-btn"
      iconBefore={heartIcon}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isWishlisted}
    >
      {intl.formatMessage(isWishlisted ? messages.wishlistedBtn : messages.wishlistBtn)}
    </Button>
  );
};

export default WishlistButton;
