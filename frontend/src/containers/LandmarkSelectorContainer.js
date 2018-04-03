import React from 'react';
import { connect } from 'react-redux';
import { imageMetadata, receiveMetadata } from '../actions';
import LandmarkSelector from '../components/LandmarkSelector';

const getMetadata = (state, ownProps) => {
	return state.imageMetadata[ownProps.imageId] || {};
};

const mapStateToProps = (state, ownProps) => {
	return { metadata: getMetadata(state, ownProps) };
};

const mapDispatchToProps = dispatch => ( {
	imageMetadata: imageId => dispatch(imageMetadata(imageId)),
	receiveMetadata: metadata => dispatch(receiveMetadata(metadata)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LandmarkSelector);
