import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Trip.scss';

const AWS_S3_BUCKET = 'https://s3.eu-west-2.amazonaws.com/travelogue-test/';
const LAMBDA = 'http://travelogue-test.s3-website.eu-west-2.amazonaws.com/';

class Trip extends React.Component {
	componentDidMount() {
		this.props.fetchTrip(this.props.match.params.tripId);
	}

	render() {
<<<<<<< HEAD
		const tripImages = this.props.trip.map( (image, i) => {
			return <li key={i}>
				<img src={'http://travelogue-test.s3-website.eu-west-2.amazonaws.com/800x600/' + image.s3_id}/></li>;
		});
=======
		let tripImages;

		const thumbnailWidth = 200;
		const thumbnailHeight = 200;

		if (this.props.trip.images) {
			tripImages = this.props.trip.images.map( (image, i) => {
				const imageUrl = `${LAMBDA}${thumbnailWidth}x${thumbnailHeight}/${image.s3_id}`;
				const imageView = '/image/' + image.s3_id;
				return <li key={i}><a href={imageView}><img src={imageUrl} /></a></li>;
			});
		}
>>>>>>> 5a6cb410d3be9d7598f7ef475e40ee80612c77b4

		return (
			<div className="trip">
				<h1>{this.props.trip.name}</h1>
				<ul>
					{tripImages}
				</ul>
			</div>
		);
	}
}

Trip.propTypes = {
	fetchTrip: PropTypes.func,
	match: PropTypes.object,
	trip: PropTypes.object,
};

export default Trip;
