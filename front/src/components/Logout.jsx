import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../redux/action';

function Logout({ logoutUser }) {
  const history = useHistory();

  useEffect(() => {
    logoutUser();
    window.localStorage.clear();
    history.push('/login');
  }, []);

  return <></>;
}

const mapDispatchToProps = { logoutUser };

export default connect(null, mapDispatchToProps)(Logout);
