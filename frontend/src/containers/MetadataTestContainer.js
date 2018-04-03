import React from 'react';
import { connect } from 'react-redux';
import { imageMetadata, receiveMetadata } from '../actions';
import MetadataTest from '../components/MetadataTest';

// const getImageId = (state) => {
// 	return state.imageMetadata.imageId;
// };

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
)(MetadataTest);
