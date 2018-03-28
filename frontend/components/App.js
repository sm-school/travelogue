import React from 'react';
import '../styles/components/App.scss';
import MapContainer from '../containers/MapContainer';

function App () {
	return (
		<div className="app">
			<h1>Travelogue</h1>
			<MapContainer />
		</div>
	);
}

export default App;
