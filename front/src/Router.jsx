import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import RegistrationForm from './components/RegistrationForm';
import Employees from './components/Employees';

function Router({ user }) {
  if (!_.isEmpty(user)) {
    return (
      <Switch>
        <Route exact path='/'>
          <Employees />
        </Route>
        <Route exact path='/logout'>
          <Logout />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/login'>
        <LoginForm />
      </Route>
      <Route path='/register'>
        <RegistrationForm />
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => {
  return { user: state.appData.user };
};

export default connect(mapStateToProps)(Router);
