import { Container, Card } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';

export const AdditionalResources = ({ ocwLinks }: { ocwLinks: string | null }) => {
  const intl = useIntl();

  if (!ocwLinks || !ocwLinks.trim()) {
    return null;
  }

  return (
    <Container className="px-0">
      <Card>
        <Card.Header title={<h2 className="my-0 h3">{intl.formatMessage(messages.additionalResourcesHeading)}</h2>} />
        <Card.Section>
          {/* "MITOpenCourseware" is a proper noun and should not be translated. */}
          <h3 className="h5 course-about-ocw-heading">MITOpenCourseware</h3>
          {
            /* eslint-disable-next-line react/no-danger */
            <div className="course-about-ocw-links" dangerouslySetInnerHTML={{ __html: ocwLinks }} />
          }
        </Card.Section>
      </Card>
    </Container>
  );
};

export default AdditionalResources;
