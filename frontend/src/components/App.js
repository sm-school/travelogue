import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MapContainer from '../containers/MapContainer';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ConnectedRouterContainer from '../containers/ConnectedRouterContainer';
import ImageContainer from '../containers/ImageContainer';

import Main from '../components/Main';
import NotFound from '../components/NotFound';
import '../styles/components/App.scss';

function App() {
	return (
		<div className="app">
			<MapContainer
				latitude={51.5261053} longitude={-0.0834954} zoom={17}
				points={ [
					[ 51.5261053, -0.0834954, 'Constructor Labs' ],
					[ 51.5271053, -0.0844954, 'Not Constructor Labs' ],
				] }
			/>
			{/*<ImageContainer imageId='parliament.jpg' />*/}
		</div>
	/*
		<BrowserRouter>
			<Main>
			    <Route component= {ConnectedRouterContainer}/>
				<Switch>
					<Route exact path="/" component={MapContainer} />
					<Route exact path="/login" component={LoginContainer} />
					<Route exact path="/register" component={RegisterContainer} />
					<Route exact path="/dashboard" component={DashboardContainer} />
					<Route path="/*" component={NotFound} />
				</Switch>
			</Main>
		</BrowserRouter>
	*/
	);
}

export default App;
