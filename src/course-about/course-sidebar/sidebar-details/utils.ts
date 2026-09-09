import { IntlShape } from '@edx/frontend-platform/i18n';
import {
  AccessTimeFilled as AccessTimeFilledIcon,
  Flag as FlagIcon,
  Archive as ArchiveIcon,
  Timelapse as TimelapseIcon,
  People as PeopleIcon,
} from '@openedx/paragon/icons';

import { formatDate } from '@src/utils';
import { SIDEBAR_DETAIL_KEYS } from './constants';
import type { CourseAboutData } from '../../types';
import messages from './messages';

/**
 * Generates an array of sidebar detail objects for course information display.
 * Each detail object contains metadata about a specific course attribute.
*/
export const getSidebarDetails = (
  intl: IntlShape,
  courseAboutData: CourseAboutData,
) => [
  {
    key: SIDEBAR_DETAIL_KEYS.START_DATE,
    icon: FlagIcon,
    label: intl.formatMessage(messages.releaseDate),
    value: formatDate(((courseAboutData.advertisedStart || courseAboutData.start) ?? ''), intl),
    show: !courseAboutData.startDateIsStillDefault,
  },
  {
    key: SIDEBAR_DETAIL_KEYS.END_DATE,
    icon: ArchiveIcon,
    label: intl.formatMessage(messages.archiveDate),
    value: formatDate((courseAboutData.end ?? ''), intl),
    show: !!courseAboutData.end,
  },
  {
    key: SIDEBAR_DETAIL_KEYS.EFFORT,
    icon: AccessTimeFilledIcon,
    label: intl.formatMessage(messages.estimatedEffort),
    value: courseAboutData.effort,
    show: !!courseAboutData.effort,
  },
  {
    key: SIDEBAR_DETAIL_KEYS.DURATION,
    icon: TimelapseIcon,
    label: intl.formatMessage(messages.courseDuration),
    value: courseAboutData.duration,
    show: !!courseAboutData.duration,
  },
  {
    key: SIDEBAR_DETAIL_KEYS.STUDENTS_ENROLLED,
    icon: PeopleIcon,
    label: intl.formatMessage(messages.studentsEnrolled),
    value: courseAboutData.enrolledStudentsCount,
    show: courseAboutData.enrolledStudentsCount != null,
  },
];
