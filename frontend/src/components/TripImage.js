import React from 'react';
import PropTypes from  'prop-types';

const TripImage = props => {
	return (
		<li><img src={props.item.pictureURL}/>
		</li>
	);
};

TripImage.propTypes = {
	item: PropTypes.object,
};
export default TripImage;
