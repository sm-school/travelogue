import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/MapFrame.scss';

import { MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

function MapFrame ({ centerLat, centerLon, zoom, points }) {
	const mapboxApi = `https://b.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;

	const markers = points.map( (point, i) => {
		let popup;

		if (points[2]) {
			popup = <Popup><span>{points[2]}</span></Popup>;
		}

		return (
			<Marker key={i} position={[ points[0], points[1] ]}>
				{popup}
			</Marker>
		);
	});

	return (
		<div>
			<div className="map_heading">Photo location</div>
			<Map center={[ centerLat, centerLon ]} zoom={zoom} id="map">
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
	centerLat: PropTypes.string,
	centerLon: PropTypes.string,
	zoom: PropTypes.number,
	points: PropTypes.array,
	setLatitude: PropTypes.func,
	setLongitude: PropTypes.func,
	setZoom: PropTypes.func,
};

export default MapFrame;
