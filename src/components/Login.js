import React, { PropTypes as T } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap'
import AuthService from '../utils/AuthService';

class Login extends React.Component {

	static propTypes = {
		location: T.object,
		auth: T.instanceOf(AuthService)
	};

  render() {

    const { auth } = this.props;

    console.log(auth);

    return (
      <div style={{margin: "12px"}}>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Login;
