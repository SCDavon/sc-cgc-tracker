import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import './index.css';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { Router, Route, IndexRedirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import CGCPage from './components/CGCPage';
import CGCRequestPage from './components/CGCRequestPage';
import ExpertPage from './components/ExpertPage';
import AuthService from './utils/AuthService';
import Login from './components/Login';
import Container from './components/Container';

const browserHistory = createBrowserHistory();
const client = new ApolloClient({
	networkInterface: createNetworkInterface({uri: "https://us-west-2.api.scaphold.io/graphql/sc-cgc-tracker"})
});

const auth = new AuthService('zj32dUlVJSwUE7u9cA1NToYPmo22IVCw', 'scdavon.auth0.com');

const requireAuth = (nextState, replace) => {
	if (!auth.loggedIn()) {
		replace({ pathname: '/login' })
	}
};

const App = () => (

	<ApolloProvider client={client}>
		<Router history={browserHistory}>
			<div>
				<Main/>
				<Route path='/' component={Container} auth={auth} />
				<Route path='/expert' component={ExpertPage}/>
				<Route path='/request' component={CGCRequestPage}/>
				<Route path='/cgc' component={CGCPage}/>
				<Route path='/login' component={Login}/>
			</div>
		</Router>
	</ApolloProvider>
);

ReactDOM.render(
	<App/>,
  document.getElementById('root')
);
