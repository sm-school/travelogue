import PropTypes from 'prop-types';
import React from 'react';

function TripLandmarks (props) {
	const landmarks = props.landmarks.map( (landmark, i) => {
		return <li key={i}>{landmark.name}</li>;
	});

	return (
		<div>
			<h2>Photos of...</h2>
			<ul className="trip_landmarks_list">
				{landmarks}
			</ul>
		</div>
	);
}

TripLandmarks.propTypes = {
	landmarks: PropTypes.array,
};

export default TripLandmarks;
