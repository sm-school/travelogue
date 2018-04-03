import React from 'react';
import '../styles/components/App.scss';
// import MapContainer from '../containers/MapContainer';
import MetadataTestContainer from '../containers/MetadataTestContainer';
// import UploaderContainer from '../containers/UploaderContainer';

// <MapContainer />
// <UploaderContainer />

function App () {
	return (
		<div className="app">
			<MetadataTestContainer imageId='pisa' />
		</div>
	);
}

export default App;
