import React from 'react';
import { connect } from 'react-redux';

import { updateLatitude, updateLongitude } from '../actions';
import MapFrame from '../components/MapFrame';

const getMap = (state) => {
	return state.map;
};

const mapStateToProps = state => {
	const map = getMap(state);

	return { ...map };
};

const mapDispatchToProps = dispatch => ( {
	updateLatitude: latitude => dispatch(updateLatitude(latitude)),
	updateLongitude: longitude => dispatch(updateLongitude(longitude)),
	updateZoom: zoom => dispatch(updateZoom(zoom)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapFrame);
