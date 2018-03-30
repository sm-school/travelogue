import React from 'react';
import '../styles/components/App.scss';
import MapContainer from '../containers/MapContainer';
import UploaderContainer from '../containers/UploaderContainer';


function App () {
	return (
		<div className="app">
			<MapContainer />
			<UploaderContainer />
		</div>
	);
}

export default App;
