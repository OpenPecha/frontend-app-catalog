import { Link } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import { ROUTES } from '@src/routes';
import type { HeroCourse } from '@src/data/hero-courses/types';
import messages from './messages';

interface HomeHeroCardProps {
  course: HeroCourse;
  /** Whether this card sits in front of the other in the stack. */
  isFront: boolean;
  /**
   * Whether anyone is signed in, which decides where the card leads: a learner
   * is dropped back into the courseware to carry on, while a signed-out visitor
   * gets the about page to read up on the course first.
   *
   * Auth state rather than per-card enrollment, because the endpoint returns one
   * flat list and does not say which cards came from enrollments and which are
   * curated fillers. The only case that misses is a signed-in visitor with fewer
   * than two enrollments, whose curated filler card points at courseware they
   * have not joined — the LMS answers that by redirecting them to the about page,
   * which is where the link would have sent them anyway.
   */
  isSignedIn: boolean;
}

/**
 * Derives a short badge from a provider's name for when it has no logo on file.
 *
 * Takes the initial of each word so "Khyentse Foundation" reads as "KF",
 * capped at two so the badge cannot overflow.
 */
const getProviderInitials = (providerName: string) => providerName
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((word) => word[0].toUpperCase())
  .join('');

/**
 * One of the homepage hero's floating course cards.
 */
const HomeHeroCard = ({ course, isFront, isSignedIn }: HomeHeroCardProps) => {
  const intl = useIntl();
  const {
    courseId, title, imageUrl, providerName, providerLogo, isNew,
  } = course;

  const aboutPath = ROUTES.COURSE_ABOUT.replace(':courseId', courseId);
  const className = `home-hero__card ${isFront ? 'home-hero__card--front' : 'home-hero__card--back'}`;

  const body = (
    <>
      {/* Left readable, unlike the provider initials below: those repeat the
          provider name rendered underneath, whereas nothing else on the card
          says the course is new. Sitting first in the card's text, the link
          announces "New course, <provider>, <title>".

          Two nested spans, not one: the outer is a square window that clips the
          inner band's ends to the corner, which is what lets the band sit at 45
          degrees without a huge overhang. Spans rather than divs because the
          whole card is an anchor. */}
      {isNew && (
        <span className="home-hero__card-ribbon">
          <span>{intl.formatMessage(messages.newCourse)}</span>
        </span>
      )}
      <span className="home-hero__card-image">
        {/* Decorative: the title beneath already names the course, so alt text
            here would only repeat it to a screen reader. */}
        {imageUrl && <img src={imageUrl} alt="" />}
      </span>
      <span className="home-hero__card-badge">
        {providerLogo
          ? (
            <img
              src={providerLogo}
              alt={intl.formatMessage(messages.providerLogoAlt, { providerName })}
            />
          )
          : providerName && <span aria-hidden="true">{getProviderInitials(providerName)}</span>}
      </span>
      <span className="home-hero__card-text">
        {providerName && <span className="home-hero__card-provider">{providerName}</span>}
        <span className="home-hero__card-title">{title}</span>
      </span>
    </>
  );

  // A learner is sent straight into the courseware on the LMS, which lives
  // outside this app, so that leg cannot be a router Link.
  if (isSignedIn) {
    return (
      <a className={className} href={`${getConfig().LMS_BASE_URL}/courses/${courseId}/course/`}>
        {body}
      </a>
    );
  }

  return <Link className={className} to={aboutPath}>{body}</Link>;
};

export default HomeHeroCard;
