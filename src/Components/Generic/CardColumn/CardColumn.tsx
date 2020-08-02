// Modules
import React from 'react';

// Styles
import './CardColumn.scss';

interface Props {
  children: JSX.Element;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  classNames?: string[];
}

const CardColumn = ({
  children,
  style = {},
  classNames = [],
  innerStyle = {},
}: Props): JSX.Element => (
  <div style={style} className={`card-column-component ${classNames.join(' ')}`}>
    <div style={innerStyle} className="card-column-inner">
      { children }
    </div>
  </div>
);

export {
  CardColumn,
};
