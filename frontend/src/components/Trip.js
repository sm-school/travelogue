import React from 'react';
import PropTypes from 'prop-types';

class Trip extends React.Component {
	componentDidMount() {
		this.props.fetchTrip(this.props.match.params.tripId);
	}

	render() {
		const tripImages = this.props.trip.map( (image, i) => {
			return <li key={i}>
				<img src={'http://travelogue-test.s3-website.eu-west-2.amazonaws.com/800x600/' + image.s3_id}/></li>;
		});

		return (
			<div className="trip">
				<h1>Your trip</h1>
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
	trip: PropTypes.array,
};

export default Trip;
