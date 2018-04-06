import React from 'react';
import PropTypes from  'prop-types';

const TripPhoto = props => {
	return (
		<li><img src={props.item.pictureURL}/>
		</li>
	);
};

TripPhoto.propTypes = {
	item: PropTypes.object,
};
export default TripPhoto;
