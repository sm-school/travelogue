import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/MapFrame.scss';

import { MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

function MapFrame ({ latitude, longitude, zoom }) {
	const position = [ latitude, longitude ];

	const mapboxApi = `https://b.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;

	// To do: get as prop
	const markerTitle = 'Marker Title';

	// To do: get an array of lat, long, title as props and produce
	// one Marker element for each. Need to think about default zoom
	return (
		<div>
			<Map center={position} zoom={zoom} id="map">
				<TileLayer
					attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url={mapboxApi}
				/>
				<Marker position={position}>
					<Popup>
						<span>
							{markerTitle}
						</span>
					</Popup>
				</Marker>
			</Map>
		</div>
	);
}

MapFrame.propTypes = {
	latitude: PropTypes.number,
	longitude: PropTypes.number,
	zoom: PropTypes.number,
	setLatitude: PropTypes.func,
	setLongitude: PropTypes.func,
	setZoom: PropTypes.func,
};

export default MapFrame;
