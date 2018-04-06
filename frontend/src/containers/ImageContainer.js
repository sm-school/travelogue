import React from 'react';
import { connect } from 'react-redux';
import { imageLandmarks, imageMetadata, receiveLandmarks, receiveMetadata } from '../actions';
import Image from '../components/Image';

const getLandmarks = (state, ownProps) => {
	return state.imageLandmarks[ownProps.imageId] || {};
};

const getMetadata = (state, ownProps) => {
	return state.imageMetadata[ownProps.imageId] || {};
};

const mapStateToProps = (state, ownProps) => {
	return {
		landmarks: getLandmarks(state, ownProps),
		metadata: getMetadata(state, ownProps),
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const mapDispatchToProps = dispatch => ( {
	imageLandmarks: imageId => dispatch(imageLandmarks(imageId)),
	imageMetadata: imageId => dispatch(imageMetadata(imageId)),
	receiveLandmarks: landmarks => dispatch(receiveLandmarks(landmarks)),
	receiveMetadata: metadata => dispatch(receiveMetadata(metadata)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Image);
