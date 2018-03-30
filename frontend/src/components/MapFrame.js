import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/MapFrame.scss';

import { MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

function MapFrame ({ latitude, longitude, zoom, updateLatitude, updateLongitude, updateZoom }) {
	const position = [ latitude, longitude ];
	// https://{s}.tile.openstreetmap.org
	const mapboxApi = `https://b.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;

	return (
		<div>
			<div className="map-inputs">
				<label htmlFor="latitude">Latitude:</label>
				<input
					type="number"
					name="latitude"
					id="latitude"
					placeholder={ latitude }
					onChange={ event => updateLatitude(event.target.value) }
					value={ latitude }
				/>
				<label htmlFor="latitude">Longitude:</label>
				<input
					type="number"
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
