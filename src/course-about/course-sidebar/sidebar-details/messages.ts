import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  releaseDate: {
    id: 'catalog.course-about.sidebar-details.release-date',
    defaultMessage: 'Release Date',
    description: 'Release date label.',
  },
  archiveDate: {
    id: 'catalog.course-about.sidebar-details.archive-date',
    defaultMessage: 'Archive Date',
    description: 'Archive date label.',
  },
  estimatedEffort: {
    id: 'catalog.course-about.sidebar-details.estimated-effort',
    defaultMessage: 'Estimated effort',
    description: 'Estimated effort label.',
  },
  price: {
    id: 'catalog.course-about.sidebar-details.price',
    defaultMessage: 'Price',
    description: 'Price label.',
  },
  requirements: {
    id: 'catalog.course-about.sidebar-details.requirements',
    defaultMessage: 'Requirements',
    description: 'Requirements label.',
  },
  prerequisites: {
    id: 'catalog.course-about.sidebar-details.prerequisites',
    defaultMessage: 'Prerequisites',
    description: 'Prerequisites label.',
  },
  prerequisitesCompletion: {
    id: 'catalog.course-about.sidebar-details.prerequisites-completion',
    defaultMessage: 'You must successfully complete {prerequisite} before you begin this course.',
    description: 'Text explaining that a prerequisite course must be completed.',
  },
  courseDuration: {
    id: 'catalog.course-about.sidebar-details.course-duration',
    defaultMessage: 'Course duration',
    description: 'Course duration label.',
  },
  studentsEnrolled: {
    id: 'catalog.course-about.sidebar-details.students-enrolled',
    defaultMessage: 'Students enrolled',
    description: 'Students enrolled count label.',
  },
});

export default messages;
