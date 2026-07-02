import { Container, Card } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';

export const CourseRequirements = ({ requirements }: { requirements: string | null }) => {
  const intl = useIntl();

  if (!requirements || !requirements.trim()) {
    return null;
  }

  return (
    <Container className="px-0">
      <Card>
        <Card.Header title={<h2 className="my-0 h3">{intl.formatMessage(messages.courseRequirementsHeading)}</h2>} />
        <Card.Section>
          {
            /* eslint-disable-next-line react/no-danger */
            <div className="course-about-requirements" dangerouslySetInnerHTML={{ __html: requirements }} />
          }
        </Card.Section>
      </Card>
    </Container>
  );
};

export default CourseRequirements;
