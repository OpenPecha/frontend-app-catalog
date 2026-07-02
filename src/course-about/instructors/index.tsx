import { useState } from 'react';
import {
  Container, Card, Stack, Image,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import type { Instructor } from '../types';
import messages from '../messages';

const InstructorItem = ({ instructor }: { instructor: Instructor }) => {
  const intl = useIntl();
  const [imageFailed, setImageFailed] = useState(false);
  const {
    name, title, organization, image, bio,
  } = instructor;

  const titleOrg = [title, organization].filter(Boolean).join(' · ');

  return (
    <Stack direction="horizontal" gap={3} className="course-about-instructor align-items-start">
      {image && !imageFailed && (
        <Image
          className="course-about-instructor-image rounded flex-shrink-0"
          src={image}
          alt={intl.formatMessage(messages.instructorImageAlt, { name: name || '' })}
          style={{
            width: '4rem', height: '4rem', minWidth: '4rem', objectFit: 'cover',
          }}
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="course-about-instructor-meta">
        {name && <p className="mb-0 font-weight-bold">{name}</p>}
        {titleOrg && <p className="mb-1 small text-gray-500">{titleOrg}</p>}
        {bio && (
          /* eslint-disable-next-line react/no-danger */
          <div className="course-about-instructor-bio small" dangerouslySetInnerHTML={{ __html: bio }} />
        )}
      </div>
    </Stack>
  );
};

export const Instructors = ({ instructorInfo }: { instructorInfo: Instructor[] }) => {
  const intl = useIntl();

  const instructors = (instructorInfo || []).filter(
    instructor => instructor && (instructor.name || instructor.bio),
  );

  if (!instructors.length) {
    return null;
  }

  return (
    <Container className="px-0">
      <Card>
        <Card.Header title={<h2 className="my-0 h3">{intl.formatMessage(messages.instructorsHeading)}</h2>} />
        <Card.Section>
          <Stack gap={4}>
            {instructors.map((instructor, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <InstructorItem key={index} instructor={instructor} />
            ))}
          </Stack>
        </Card.Section>
      </Card>
    </Container>
  );
};

export default Instructors;
