// Modules
import React from 'react';

// Components
import ReactDatePicker from 'react-datepicker';

// Styles
import './DatePicker.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  selected: Date|null|undefined;
  onChange(date: Date | null): void;
}

const DatePicker = ({ selected, onChange }: Props): JSX.Element => (
  <div className="date-picker-component">
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
    />
  </div>
);

export {
  DatePicker,
};
