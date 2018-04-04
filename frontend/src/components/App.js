import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ConnectedRouterContainer from '../containers/ConnectedRouterContainer';

import Main from '../components/Main';
import NotFound from '../components/NotFound';
import '../styles/components/App.scss';




class App extends React.Component {

	componentDidMount() {
		if (!this.props.user) this.props.fetchUser();
	}
	render() {
		return (
			<BrowserRouter>
				<Main>
					<Route component={ConnectedRouterContainer} />
					<Switch>
						<Route exact path="/" component={MapContainer} />
						<Route exact path="/login" component={LoginContainer} />
						<Route exact path="/register" component={RegisterContainer} />
						<Route exact path="/dashboard" component={DashboardContainer} />
						<Route path="/*" component={NotFound} />
					</Switch>
				</Main>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	fetchUser : PropTypes.func,
	user: PropTypes.object,
};
export default App;
