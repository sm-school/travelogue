import React from 'react';
import { connect } from 'react-redux';
import { setLatitude, setLongitude, setZoom } from '../actions';
import MapFrame from '../components/MapFrame';

const getMap = (state) => {
	return state.map;
};

const mapStateToProps = state => {
	const map = getMap(state);

	return { ...map };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	let merged = Object.assign({}, ownProps, stateProps, dispatchProps);

	return Object.assign({}, merged, {
		latitude: stateProps.latitude || ownProps.latitude,
		longitude: stateProps.longitude || ownProps.longitude,
		zoom: stateProps.zoom || ownProps.zoom,
	});
}

const mapDispatchToProps = dispatch => ( {
	setLatitude: latitude => dispatch(receiveLatitude(latitude)),
	setLongitude: longitude => dispatch(receiveLongitude(longitude)),
	setZoom: zoom => dispatch(receiveZoom(zoom)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(MapFrame);
