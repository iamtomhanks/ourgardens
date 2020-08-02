// Modules
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';

// Styles
import './Tooltip.scss';

interface Props {
  text: string;
  direction?: string;
}

class Tooltip extends React.Component<Props, {}> {
  render(): JSX.Element {
    const { text, direction } = this.props;

    return (
      <div className="tooltip-component">
        <span className="icon"><InfoIcon /></span>
        <div className={`text ${direction ? direction : ''}`}>{text}</div>
      </div>
    );
  }
}
export {
  Tooltip,
};
