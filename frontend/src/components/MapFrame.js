import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { MAPBOX_ACCESS_TOKEN } from '../constants/action-types';

function MapFrame ({ latitude, longitude, zoom, updateLatitude, updateLongitude, updateZoom }) {
	const position = [ latitude, longitude ];
	const mapboxApi = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=${ MAPBOX_ACCESS_TOKEN }`;

	return (
		<div>
			<div className="map-inputs">
				<label htmlFor="latitude">Latitude:</label>
				<input
					type="text"
					name="latitude"
					id="latitude"
					placeholder={ latitude }
					onChange={ event => updateLatitude(event.target.value) }
					value={ latitude }
				/>
				<label htmlFor="latitude">Longitude:</label>
				<input
					type="text"
					name="longitude"
					id="longitude"
					placeholder={ longitude }
					onChange={ event => updateLongitude(event.target.value) }
					value={ longitude }
				/>
			</div>
			<Map center={ position } zoom={ zoom } id="map">
				<TileLayer
					attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url={mapboxApi}
				/>
				<Marker position={ position }>
					<Popup>
						<span>
							A pretty CSS3 popup. <br /> Easily customizable.
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
	updateLatitude: PropTypes.func,
	updateLongitude: PropTypes.func,
	updateZoom: PropTypes.func,
	zoom: PropTypes.number,
};

export default MapFrame;
