import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Form, SearchField } from '@openedx/paragon';

import { ROUTES } from '@src/routes';
import HomeOverlayHtmlSlot from '@src/plugin-slots/HomeOverlayHtmlSlot';

import HomeHeroCards from './HomeHeroCards';
import messages from './messages';

/**
 * The home page hero: a greeting and course search on one side, a pair of
 * floating course cards on the other.
 */
const HomeBanner = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => navigate(`${ROUTES.COURSES}?search_query=${searchValue}`);

  const searchField = getConfig().ENABLE_COURSE_DISCOVERY && (
    <Form.Group className="home-hero__search">
      {/* No external submit button, unlike the catalog page's search: the hero
          field is styled as a single pill and submits on Enter. */}
      <SearchField
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
        onSubmit={handleSearch}
      />
    </Form.Group>
  );

  return (
    <section className="home-hero" data-testid="home-banner">
      <div className="home-hero__intro">
        <HomeOverlayHtmlSlot />
        {searchField}
      </div>
      <HomeHeroCards />
    </section>
  );
};

export default HomeBanner;
