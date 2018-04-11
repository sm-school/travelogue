'use strict';

import PropTypes from 'prop-types';
import React from 'react';

import Landmarks from './Landmarks';
import MapContainer from '../containers/MapContainer';
import '../styles/components/Image.scss';

const AWS_S3_BUCKET = 'https://s3.eu-west-2.amazonaws.com/travelogue-test/';

class Image extends React.Component {

	componentDidMount() {
		this.props.imageLandmarks(this.props.imageId);
		this.props.imageMetadata(this.props.imageId);
	}

	render() {
		const imageUrl = AWS_S3_BUCKET + this.props.imageId;

		let landmarks = [];
		let latitude = this.props.metadata.latitude;
		let longitude = this.props.metadata.longitude;
		// let name = this.props.metadata.name;

		let mapComponent, landmarksComponent;

		if (latitude && longitude) {
			mapComponent = <MapContainer
				centerLat={latitude}
				centerLon={longitude}
				zoom={17}
				points={[ latitude, longitude ]}
			/>;
		} else {
			mapComponent = 'No map data available';
		}

		if (this.props.landmarks.landmarks) {
			landmarksComponent = <Landmarks landmarks={this.props.landmarks.landmarks} />;
		} else {
			landmarksComponent = '';
		}

		return (
			<div className="image">
				<div className="image_frame">
					<img src={imageUrl} />
				</div>
				<div className="metadata">
					<div className="map_frame">
						{mapComponent}
					</div>
					<div className="landmarks">
						{landmarksComponent}
					</div>
				</div>
			</div>
		);
	}
}

Image.propTypes = {
	imageId: PropTypes.string,
	imageLandmarks: PropTypes.func,
	imageMetadata: PropTypes.func,
	landmarks: PropTypes.object,
	metadata: PropTypes.object,
};

export default Image;
