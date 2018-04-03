import React from 'react';
import '../styles/components/App.scss';
// import MapContainer from '../containers/MapContainer';
import LandmarkSelectorContainer from '../containers/LandmarkSelectorContainer';
// import UploaderContainer from '../containers/UploaderContainer';

// <MapContainer />
// <UploaderContainer />

function App () {
	return (
		<div className="app">
			<LandmarkSelectorContainer imageId='parliament' />
		</div>
	);
}

export default App;
