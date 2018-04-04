import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/MapFrame.scss';

import { MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

// need to rename to mapCenterLatitude, mapCenterLongitude
function MapFrame ({ latitude, longitude, zoom, points }) {
	const mapboxApi = `https://b.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;

	const markers = points.map( (point, i) => {
		return (
			<Marker key={i} position={[ point[0], point[1] ]}>
				<Popup>
					<span>{point[2]}</span>
				</Popup>
			</Marker>
		);
	});

	return (
		<div>
			<Map center={[ latitude, longitude ]} zoom={zoom} id="map">
				<TileLayer
					attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url={mapboxApi}
				/>
				{markers}
			</Map>
		</div>
	);
}

MapFrame.propTypes = {
	latitude: PropTypes.number,
	longitude: PropTypes.number,
	zoom: PropTypes.number,
	points: PropTypes.array,
	setLatitude: PropTypes.func,
	setLongitude: PropTypes.func,
	setZoom: PropTypes.func,
};

export default MapFrame;
