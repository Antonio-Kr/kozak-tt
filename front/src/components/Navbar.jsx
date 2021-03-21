import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
  if (!_.isEmpty(user)) {
    return (
      <ul>
        <li>
          <Link to='/employees'>Employees</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
}

const mapStateToProps = (state) => {
  return { user: state.appData.user };
};

export default connect(mapStateToProps)(Navbar);
