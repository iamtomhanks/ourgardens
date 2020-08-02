// Modules
import React from 'react';
import Select, { MenuPlacement } from 'react-select';

// Styles
import './Filter.scss';

// Interfaces
import {
  Filter as FilterInterface, SelectedFilter,
} from 'Interfaces/DashboardFilters';

// Utils
import { Colors } from 'Utils';

interface Props {
  onChange(value: SelectedFilter): void;
  label: string|null;
  selected: SelectedFilter;
  filters: FilterInterface[];
  fieldId: string;
  isMulti?: boolean;
  midSentenceDropdown?: boolean;
  menuPlacement?: MenuPlacement;
  isClearable?: boolean;
  placeholder?: string;
}

class Filter extends React.Component<Props, {}> {
  onChange = (evt: SelectedFilter): void => {
    if (evt === null && this.props.isMulti) {
      // eslint-disable-next-line no-param-reassign
      evt = [] as FilterInterface[];
    }

    this.props.onChange(evt);
  }

  render(): JSX.Element {
    const {
      label,
      selected,
      filters,
      fieldId,
      isMulti,
      midSentenceDropdown,
      menuPlacement,
      isClearable,
      placeholder,
    } = this.props;

    // Style this as an underlined word with a dropdown
    let midSentenceClass = '';
    let customStyles = {};
    if (midSentenceDropdown) {
      midSentenceClass = 'mid-sentence-dropdown';
      customStyles = {
        control: (): React.CSSProperties => ({
          border: 'none',
          borderRadius: '0',
          background: 'none',
          display: 'flex',
        }),
        dropdownIndicator: (): React.CSSProperties => ({
          color: '#333',
          paddingRight: '6px',
        }),
        indicatorSeparator: (): React.CSSProperties => ({
          display: 'none',
        }),
        option: (provided: React.CSSProperties, state: any): React.CSSProperties => ({
          ...provided,
          fontWeight: 'normal',
          background: state.isFocused ? Colors.blue1 : '#fff',
          color: '#333',
          padding: '6px',
          cursor: 'pointer',
        }),
        singleValue: (): React.CSSProperties => ({
        }),
        menu: (provided: React.CSSProperties): React.CSSProperties => ({
          ...provided,
          width: 'auto',
        }),
        valueContainer: (): React.CSSProperties => ({
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '6px',
        }),
      };
    }

    return (
      <div className={`filter-component ${midSentenceClass}`}>
        {label !== null && <label htmlFor={fieldId}>{label}</label>}
        <Select
          menuPlacement={menuPlacement || 'bottom'}
          placeholder={placeholder || ''}
          styles={customStyles}
          value={selected}
          id={fieldId}
          options={filters}
          onChange={(evt): void => this.onChange(evt as SelectedFilter)}
          isMulti={isMulti === true}
          isClearable={isClearable === true}
        />
      </div>
    );
  }
}

export {
  Filter,
};
