// Modules
import React from 'react';
// import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Styles
import './Merchants.scss';

// Actions
// import * as homeActions from 'Redux/Actions/Home';

// Interfaces
// import { AppState } from 'Interfaces/Redux';
import { RouteComponentProps } from 'react-router-dom';

type Props = MapStateProps & RouteComponentProps;

class Merchants extends React.Component<Props> {
  render(): JSX.Element|null {
    // const {  } = this.props;
    return (
      <div className="merchants-component">
       
      </div>
    );
  }
}

interface MapStateProps {}

const mapStateToProps = (/* state: AppState */): MapStateProps => ({

});

const ConnectedMerchants = connect(mapStateToProps, null)(Merchants);

export {
  ConnectedMerchants as Merchants,
};