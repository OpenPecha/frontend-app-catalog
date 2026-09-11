import {
  breakpoints, Button, Stack, useMediaQuery,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { getLearningHomePageUrl } from '../utils';
import messages from '../messages';
import { STATUS_MESSAGE_VARIANTS } from '../constants';
import type { EnrolledStatusTypes } from './types';
import { StatusMessage } from './StatusMessage';

// Covers both the plain-enrolled and verified/purchased cases: they only
// differ in which status message reads, not in layout or the button — there
// is no "Manage purchase" link, since nothing in this app manages a purchase
// yet.
export const EnrolledStatus = ({ courseId, enrollmentMode }: EnrolledStatusTypes) => {
  const intl = useIntl();
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });
  const isVerified = enrollmentMode === 'verified';

  return (
    <Stack direction={isExtraSmall ? 'vertical' : 'horizontal'} gap={isExtraSmall ? 2 : 5}>
      <StatusMessage
        variant={STATUS_MESSAGE_VARIANTS.SUCCESS}
        messageKey={isVerified ? 'statusMessagePurchased' : 'statusMessageEnrolled'}
      />
      <Button as="a" variant="secondary" href={getLearningHomePageUrl(courseId)}>
        {intl.formatMessage(messages.viewCourseBtn)}
      </Button>
    </Stack>
  );
};
