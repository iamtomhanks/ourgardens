// Modules
import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

// Styles
import 'Styles/base.scss';

// Interfaces
// import { AppState } from 'Interfaces/Redux';

// Components
import { Home } from 'Components/Home';
import { Merchants } from 'Components/Merchants';

// Actions
import * as homeActions from 'Redux/Actions/Home';

interface MapDispatchProps {
  actions: {
  };
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchProps => ({
  actions: bindActionCreators({
    ...homeActions,
  }, dispatch),
});

const connector = connect(null, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

class App extends React.Component<ReduxProps, {}> {
  render(): JSX.Element {
    return (
      <>
        {/* <Nav /> */}
        <Router>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/merchants" component={Merchants} />
          </Switch>
        </Router>
      </>
    );
  }
}
export default connector(App);
