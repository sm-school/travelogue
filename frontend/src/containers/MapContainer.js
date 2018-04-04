import React from 'react';
import { connect } from 'react-redux';
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
		points: stateProps.points || ownProps.points,
	});
}

const mapDispatchToProps = dispatch => ( {
	setLatitude: latitude => dispatch(receiveLatitude(latitude)),
	setLongitude: longitude => dispatch(receiveLongitude(longitude)),
	setZoom: zoom => dispatch(receiveZoom(zoom)),
	setPoint: point => dispatch(receivePoint(point)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(MapFrame);
