import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ConnectedRouterContainer from '../containers/ConnectedRouterContainer';
import LogoutContainer from '../containers/LogoutContainer';
import ImageContainer from '../containers/ImageContainer';

import Main from '../components/Main';
import NotFound from '../components/NotFound';
import '../styles/components/App.scss';


class App extends React.Component {

	componentDidMount() {
		if (Object.keys(this.props.user).length == 0) {
			this.props.fetchUser();
		}
	}
	render() {
		return (
			<BrowserRouter>
				<Main>
					<Route component={ConnectedRouterContainer} />
					<Switch>
						<Route exact path="/" render={(props) => (
							<MapContainer
								latitude={51.5261053} longitude={-0.0834954} zoom={17}
								points={ [
									[ 51.5261053, -0.0834954, 'Constructor Labs' ],
									[ 51.5271053, -0.0844954, 'Not Constructor Labs' ],
								] }
							/>
						)} />
						<Route exact path="/login" component={LoginContainer} />
						<Route exact path="/register" component={RegisterContainer} />
						<Route exact path="/dashboard" component={DashboardContainer} />
						<Route exact path="/logout" component={LogoutContainer}/>
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
