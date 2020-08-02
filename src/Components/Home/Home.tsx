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
import { RouteComponentProps } from 'react-router-dom';

type Props = MapStateProps & RouteComponentProps;

class Home extends React.Component<Props> {
  render(): JSX.Element|null {
    // const {  } = this.props;
    return (
      <div className="home-component">
        <div className="hero-banner">
          <div className="promo-container">
            <h1>Local, farm-fresh food</h1>
            <p>
              Discover local farmers and food producers and explore what they offer.
            </p>
            <div className="action-buttons">
              <button onClick={() => this.props.history.push('/merchants')}>
                View merchants
              </button>
            </div>
          </div>
        </div>
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