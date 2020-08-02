// Modules
import React from 'react';
// import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Styles
import './Home.scss';

// Actions
// import * as homeActions from 'Redux/Actions/Home';

// Interfaces
// import { AppState } from 'Interfaces/Redux';

// Components

type Props = MapStateProps;

class Home extends React.Component<Props> {
  render(): JSX.Element|null {
    // const {  } = this.props;
    return (
      <div className="home-component">
       
      </div>
    );
  }
}

interface MapStateProps {}

const mapStateToProps = (/* state: AppState */): MapStateProps => ({

});

const ConnectedHome = connect(mapStateToProps, null)(Home);

export {
  ConnectedHome as Home,
};