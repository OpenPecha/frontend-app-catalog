import { useContext } from 'react';
import { Button, DataTableContext } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';

interface FiltersHeaderContext {
  state?: { filters?: unknown[] };
  setAllFilters?: (filters: unknown[]) => void;
}

/**
 * The filter sidebar's heading: the "Filters" title plus a "Clear all" button.
 *
 * Passed to DataTable as `filtersTitle`, which SidebarFilters renders in place
 * of its own heading. That's the only injection point Paragon offers here — it
 * renders its own "Clear filters" button internally, below every filter group,
 * with no prop to reposition or relabel it. Rendering a real button here (and
 * hiding that one in CSS) keeps the label a translatable string, which a
 * CSS-generated label could never be.
 */
const CatalogFiltersHeader = () => {
  const intl = useIntl();
  const { state, setAllFilters } = useContext(DataTableContext) as FiltersHeaderContext;
  const hasActiveFilters = (state?.filters?.length ?? 0) > 0;

  return (
    <>
      <span>{intl.formatMessage(messages.filtersTitle)}</span>
      {hasActiveFilters && setAllFilters && (
        <Button
          variant="link"
          size="inline"
          className="catalog-filters-header__clear"
          onClick={() => setAllFilters([])}
        >
          {intl.formatMessage(messages.clearFiltersText)}
        </Button>
      )}
    </>
  );
};

export default CatalogFiltersHeader;
