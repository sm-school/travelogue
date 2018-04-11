import React from 'react';
import PropTypes from 'prop-types';

import TripLandmarks from './TripLandmarks';

import '../styles/components/Trip.scss';

const AWS_S3_BUCKET = 'https://s3.eu-west-2.amazonaws.com/travelogue-test/';
const LAMBDA = 'http://travelogue-test.s3-website.eu-west-2.amazonaws.com/';

class Trip extends React.Component {
	componentDidMount() {
		const tripId = this.props.match.params.tripId;
		this.props.fetchTrip(tripId);
		this.props.fetchTripLandmarks(tripId);
	}

	render() {
		let tripImages, tripLandmarks;

		const thumbnailWidth = 200;
		const thumbnailHeight = 200;

		if (this.props.trip.images) {
			tripImages = this.props.trip.images.map( (image, i) => {
				const imageUrl = `${LAMBDA}${thumbnailWidth}x${thumbnailHeight}/${image.s3_id}`;
				const imageView = '/image/' + image.s3_id;
				return <li key={i}><a href={imageView}><img src={imageUrl} /></a></li>;
			});
		}

		if (this.props.landmarks) {
			tripLandmarks = <TripLandmarks landmarks={this.props.landmarks} />;
		}

		return (
			<div className="trip">
				<h1>{this.props.trip.name}</h1>
				<ul className="trip_images">
					{tripImages}
				</ul>
				{tripLandmarks}
			</div>
		);
	}
}

Trip.propTypes = {
	fetchTrip: PropTypes.func,
	fetchTripLandmarks: PropTypes.func,
	match: PropTypes.object,
	landmarks: PropTypes.array,
	trip: PropTypes.object,
};

export default Trip;
