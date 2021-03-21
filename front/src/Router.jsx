import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

export default function Router() {
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
