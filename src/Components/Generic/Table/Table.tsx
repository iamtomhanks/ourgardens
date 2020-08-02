// Modules
import React from 'react';

// Styles
import './Table.scss';

// Interfaces
import { SortDirection, SortType } from 'Interfaces/Table';
import { RequestState, RequestStatus } from 'Interfaces/Requests';
import { Filter as FilterInterface, SelectedFilter } from 'Interfaces/DashboardFilters';

// Components
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Filter } from 'Components/Generic/Filter';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Tooltip } from 'Components/Generic/Tooltip';

// Utils
import { stringContainsString } from 'Utils';
import { Loader } from '../Loader';

export interface Column {
  header: string;
  accessor: string;
  cellStyle?(cellData: string): React.CSSProperties;
  sort?: {
    sortType: SortType;
  };
  multiSelect?: boolean;
}

interface Props {
  data: object[];
  columns: Column[];
  searchable?: boolean;
  requestState: RequestState;
  tooltip?: string;
}

interface State {
  searchTerm: string;
  columnSort: {
    accessor: string;
    direction: SortDirection;
    sortType: SortType;
  };
  controlPanelOpen: boolean;
  activeColumn: Column|null;
  columnFilters: {
    [key: string]: { // column header
      selected: SelectedFilter;
      filters: FilterInterface[];
    };
  };
}

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchTerm: '',
      columnSort: {
        accessor: '',
        direction: SortDirection.none,
        sortType: SortType.alpha,
      },
      controlPanelOpen: false,
      activeColumn: null,
      columnFilters: {},
    };
  }

  componentDidUpdate(prevProps: Props): void {
    if ([RequestStatus.STARTED, RequestStatus.NOT_STARTED].includes(prevProps.requestState.status)
    && this.props.requestState.status === RequestStatus.SUCCESS) {
      this.prepareColumnFilters();
    }
  }

  prepareColumnFilters = (): void => {
    const { data, columns } = this.props;

    if (data.length === 0) return;

    const columnsVals: {[key: string]: {[key: string]: string}} = {};
    columns.forEach((col) => { columnsVals[col.accessor] = {}; });

    data.forEach((row) => {
      Object.keys(row).forEach((colKey) => {
        const colVal = row[colKey];
        if (columnsVals[colKey] && !columnsVals[colKey][colVal]) {
          columnsVals[colKey][colVal] = colVal;
        }
      });
    });

    const columnFilters: {
      [key: string]: { // column header
        selected: SelectedFilter;
        filters: FilterInterface[];
      };
    } = {};

    Object.keys(columnsVals).forEach((colKey) => {
      const filters: FilterInterface[] = Object.keys(columnsVals[colKey]).map((uniqueColVal) => ({
        value: uniqueColVal,
        label: uniqueColVal,
      }));

      columnFilters[colKey] = {
        filters,
        selected: [],
      };
    });

    this.setState({ columnFilters, activeColumn: columns[0] });
  }

  applyColFilters = (data: object[]): object[] => {
    const { columnFilters } = this.state;

    return data.filter((row) => {
      const colKeys = Object.keys(columnFilters);
      for (let i = 0; i < colKeys.length; i += 1) {
        const selectedColVals: FilterInterface[] = columnFilters[colKeys[i]].selected as FilterInterface[];

        if (selectedColVals.length > 0 && !selectedColVals.some((sF) => sF.value === row[colKeys[i]])) {
          return false;
        }
      }

      return true;
    });
  }

  rows = (): JSX.Element|null => {
    const { columns } = this.props;

    const data = this.filterData();
    if (!data || data.length === 0) return null;

    const rows: JSX.Element[][] = Array.from(Array(data.length), () => new Array(0));

    this.applyColFilters(data).forEach((rowData, rowIdx: number) => {
      columns.forEach((column) => {
        const style = column.cellStyle ? column.cellStyle(rowData[column.accessor]) : {};
        const element = (
          <div key={`${rowIdx + 1}-${column.accessor}`} className="cell" style={style} role="cell">{rowData[column.accessor]}</div>
        );
        rows[rowIdx].push(element);
      });
    });

    return (
      <div className="rows-container" role="rowgroup">
        {rows.map((row, rowIdx: number): JSX.Element => (
          <div key={`row-${rowIdx + 1}`} className="row-container" role="row" aria-rowindex={rowIdx}>
            {row.map((cell) => cell)}
          </div>
        ))}
      </div>
    );
  }

  onSearch = (searchTerm: string): void => {
    this.setState({ searchTerm });
  }

  columnFilterClicked = (column: Column): void => {
    const { accessor, sort } = column;

    if (!sort) return;

    const state = { ...this.state };
    const columnSort = { ...state.columnSort };

    if (columnSort.accessor === accessor) {
      if (columnSort.direction === SortDirection.ascending) {
        columnSort.direction = SortDirection.descending;
      } else if (columnSort.direction === SortDirection.descending) {
        columnSort.direction = SortDirection.ascending;
      }
    } else {
      columnSort.accessor = accessor;
      columnSort.direction = SortDirection.descending;
    }

    columnSort.sortType = sort.sortType;

    state.columnSort = columnSort;

    state.activeColumn = column; // header of column clicked

    this.setState(state);
  }

  sortData = ({
    a,
    b,
    direction,
    sortType,
    accessor,
  }: {
    a: object;
    b: object;
    direction: SortDirection;
    sortType: SortType;
    accessor: string;
  }): number => {
    if (sortType === SortType.alpha) {
      if (direction === SortDirection.ascending) {
        return a[accessor].localeCompare(b[accessor]);
      }
      if (direction === SortDirection.descending) {
        return b[accessor].localeCompare(a[accessor]);
      }
      return 0;
    }
    return 0;
  }

  filterData = (): object[] => {
    let { data } = this.props;
    const { columns } = this.props;
    const { searchTerm, columnSort } = this.state;

    if (searchTerm.length > 0) {
      data = data.filter((obj) => (
        columns.some((column) => stringContainsString(obj[column.accessor], searchTerm))
      ));
    }

    const { direction, sortType, accessor } = columnSort;
    if (columnSort.accessor !== '') {
      data = data.sort((a, b) => this.sortData({
        a,
        b,
        direction,
        sortType,
        accessor,
      }));
    }

    return data;
  }

  toggleControlPanel = (controlPanelOpen: boolean): void => {
    this.setState({ controlPanelOpen });
  }

  searchBar = (): JSX.Element|null => {
    const { searchable } = this.props;
    if (!searchable) return null;

    const { searchTerm } = this.state;

    return (
      <div className="search-input-container">
        <SearchIcon />
        <input
          type="text"
          value={searchTerm}
          onChange={(e): void => this.onSearch(e.target.value)}
        />
      </div>
    );
  }

  onColFilterChange = (colAccessor: string, selected: SelectedFilter): void => {
    this.setState({
      columnFilters: {
        ...this.state.columnFilters,
        [colAccessor]: {
          ...this.state.columnFilters[colAccessor],
          selected,
        },
      },
    });
  }

  columnValSelect = (): JSX.Element|null => {
    // const { data } = this.props;
    const { activeColumn, columnFilters } = this.state;

    if (!activeColumn) return null;

    const { selected, filters } = columnFilters[activeColumn.accessor];

    return (
      <Filter
        onChange={(evt): void => this.onColFilterChange(activeColumn.accessor, evt)}
        label={`Select values for ${activeColumn.header}`}
        selected={selected}
        filters={filters}
        fieldId="date-filter"
        isMulti
      />
    );
  }

  render(): JSX.Element {
    const { columns, data, requestState, tooltip } = this.props;
    const { controlPanelOpen } = this.state;

    if ([RequestStatus.STARTED, RequestStatus.NOT_STARTED].includes(requestState.status)) {
      return <Loader />;
    }

    return (
      <div className="table-component" role="table" aria-rowcount={data.length}>
        <div className="header-container" role="row">
          <div className="panel-toggle">
            {this.state.controlPanelOpen
              ? <ArrowDropUpIcon onClick={(): void => this.toggleControlPanel(false)} />
              : <ArrowDropDownIcon onClick={(): void => this.toggleControlPanel(true)} />}
          </div>
          {tooltip &&
            <Tooltip text={tooltip} />
          }
          <div className={`table-controls-container ${controlPanelOpen ? 'open' : ''}`}>
            {this.columnValSelect()}
          </div>
          <div className="column-headers-container">
            {columns.map((column) => (
              <div
                onClick={(): void => this.columnFilterClicked(column)}
                key={column.header}
                tabIndex={column.sort ? 0 : -1}
                className={`header ${column.sort ? 'sortable' : ''}`}
                role="columnheader"
                onKeyPress={(e): void => {
                  if (e.keyCode === 13) this.columnFilterClicked(column);
                }}
              >
                {(column.sort || column.multiSelect)
                    && (
                      <FilterListIcon />
                    )}
                <span className="text">{ column.header }</span>
              </div>
            ))}
          </div>
          {this.searchBar()}
        </div>
        {this.rows()}
      </div>
    );
  }
}

export {
  Table,
};
