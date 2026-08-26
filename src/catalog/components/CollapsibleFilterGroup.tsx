import { useState } from 'react';
import { CheckboxFilter } from '@openedx/paragon';
import { ExpandMore } from '@openedx/paragon/icons';

import type { FilterColumn } from './types';

// Course type starts collapsed to match the mockup; language/org start open.
// Selections live in the column's own filter state, so collapsing a group
// never loses a checked value.
const DEFAULT_CLOSED = new Set(['modes']);

const CollapsibleFilterGroup = ({ column }: { column: FilterColumn }) => {
  const [isOpen, setIsOpen] = useState(!DEFAULT_CLOSED.has(column.id));
  const bodyId = `catalog-filter-group-${column.id}`;

  return (
    <div className="catalog-filter-group" data-open={isOpen}>
      <button
        type="button"
        className="catalog-filter-group__toggle"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{column.Header}</span>
        <ExpandMore className="catalog-filter-group__caret" />
      </button>
      <div className="catalog-filter-group__body" id={bodyId} hidden={!isOpen}>
        <CheckboxFilter column={column} />
      </div>
    </div>
  );
};

export default CollapsibleFilterGroup;
