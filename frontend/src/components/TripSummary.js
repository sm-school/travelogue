import React from 'react';
import PropTypes from 'prop-types';
import TripPhoto from './TripPhoto';

class TripSummary extends React.Component {
	componentDidMount() {
		if (this.props.trip.length == 0) {
			this.props.fetchTripSummary();
		}
	}

	renderTripPhotos(tripInfo) {
		if (tripInfo.length !== 0) {
			return (
				<ul>
					{tripInfo.map(imageObject => {
						return <TripPhoto item={imageObject} />;
					})}
				</ul>
			);
		} else {
			return null;
		}
	};
	render() {
		return (
			<div>
				<h1>Your photos!</h1>
				{this.renderTripPhotos(this.props.trip)};
			</div>
		);
	}
}

TripSummary.propTypes = {
	trip: PropTypes.array,
	fetchTripSummary: PropTypes.func,
};

export default TripSummary;
