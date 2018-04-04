import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MapContainer from '../containers/MapContainer';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import DashboardContainer from '../containers/DashboardContainer';
import ConnectedRouterContainer from '../containers/ConnectedRouterContainer';
import LandmarkSelectorContainer from '../containers/LandmarkSelectorContainer';

import Main from '../components/Main';
import NotFound from '../components/NotFound';
import '../styles/components/App.scss';

function App() {
	return (
		<div className="app">
			<LandmarkSelectorContainer imageId='parliament' />
		</div>
	);
}

export default App;
