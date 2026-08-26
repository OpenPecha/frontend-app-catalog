export interface CatalogPageHeadProps {
  searchString: string;
  /** Pre-resolved heading for an active search; see CatalogPageHead. */
  searchTitle?: string;
}

export interface FilterChoice {
  name: string;
  value: string;
  number?: number;
}

/**
 * Shape of a react-table column once react-table's filtering plugin has
 * processed it — richer than the plain `TableColumn` definition passed into
 * `DataTable`'s `columns` prop (see CourseCatalogDataTableSlot/types.ts).
 */
export interface FilterColumn {
  id: string;
  Header: string;
  filterValue?: string[];
  setFilter: (value: string[]) => void;
  filterChoices: FilterChoice[];
  getHeaderProps: () => { key: string };
}
