import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../components/Main';
import NotFound from '../components/NotFound';

import ConnectedRouterContainer from '../containers/ConnectedRouterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ImageContainer from '../containers/ImageContainer';
import LoginContainer from '../containers/LoginContainer';
import LogoutContainer from '../containers/LogoutContainer';
import MapContainer from '../containers/MapContainer';
import RegisterContainer from '../containers/RegisterContainer';
import TripContainer from '../containers/TripContainer';
import Launchpage from './Launchpage';
import Profile from './Profile';
import '../styles/components/App.scss';

class App extends React.Component {

	componentDidMount() {
		if (!this.props.user.loggedIn) {
			this.props.fetchUser();
		}
	}

	render() {
		return (
			<BrowserRouter>
				<Main>
					<Route component={ConnectedRouterContainer} />
					<Switch>
						<Route exact path="/" component={Launchpage} />
						<Route path="/*" component={NotFound} />
					</Switch>
				</Main>
			</BrowserRouter>
		);
	}
}

const ImageComponent = ({ match }) => (
	<ImageContainer imageId={match.params.imageId} />
);

const TripComponent = ({ match }) => (
	<TripContainer tripId={match.params.tripId} />
);


ImageComponent.propTypes = {
	match: PropTypes.object,
};

TripComponent.propTypes = {
	match: PropTypes.object,
};

App.propTypes = {
	fetchUser: PropTypes.func,
	user: PropTypes.object,
};

export default App;
