import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/components/MapFrame.scss';

import { MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

class MapFrame extends React.Component {

	componentDidMount() {
		// this.props.setLatitude(this.props.latitude);
		// this.props.setLongitude(this.props.longitude);
		// this.props.setZoom(this.props.zoom);
	}

	render() {
		console.log('MAP LATITUDE:', this.props.latitude);
		const { latitude, longitude, zoom } = this.props;
		const position = [ latitude, longitude ];

		const mapboxApi = `https://b.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;

		return (
			<div>
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
