// Modules
import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import queryString from 'query-string';

// Styles
import 'Styles/base.scss';

// Interfaces
import { AppState } from 'Interfaces/Redux';

// Components
import { Home } from 'Components/Home';

// Actions
import * as dashboardActions from 'Redux/Actions/Dashboard';

interface MapStateProps {
  companyId: number|null;
}

interface MapDispatchProps {
  actions: {
    setCompanyId(companyId: number): void;
  };
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchProps => ({
  actions: bindActionCreators({
    ...dashboardActions,
  }, dispatch),
});

const mapStateToProps = (state: AppState): MapStateProps => ({
  companyId: state.dashboard.companyId,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

class App extends React.Component<ReduxProps, {}> {
  componentDidMount(): void {
    const { CompanyID } = queryString.parse(window.location.search);

    this.props.actions.setCompanyId(parseInt(CompanyID as string, 10));
  }

  render(): JSX.Element {
    return (
      <>
        {/* <Nav /> */}
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </>
    );
  }
}
export default connector(App);
