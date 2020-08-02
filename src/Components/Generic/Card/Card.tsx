// Modules
import React from 'react';

// Styles
import './Card.scss';

interface Props {
  children: JSX.Element|JSX.Element[];
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  classNames?: string[];
}

class Card extends React.Component<Props, {}> {
  cardRef: React.RefObject<HTMLDivElement>;
  
  constructor(props: Props) {
    super(props);
    this.cardRef = React.createRef();
  }

  /**
   * Increase z-index on card when mouse is over so any chart tooltips, etc
   * are above everything else
   */
  onMouseEnter = () => {
    if (this.cardRef.current) {
      this.cardRef.current.style.zIndex = '100';
    }
  }

  onMouseLeave = () => {
    if (this.cardRef.current) {
      this.cardRef.current.style.zIndex = 'auto';
    }
  }

  render(): JSX.Element {
    const {
      children,
      style = {},
      classNames = [],
      innerStyle = {},
    } = this.props;
    return (
      <div
        style={style}
        className={`card-component ${classNames.join(' ')}`}
        ref={this.cardRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div style={innerStyle} className="card-inner">
          { children }
        </div>
    </div>
    );
  }
}
export {
  Card,
};
