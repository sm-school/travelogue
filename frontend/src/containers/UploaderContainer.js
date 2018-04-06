import React from 'react';
import { connect } from 'react-redux';
import { uploadImages, addImages, turnImagesIntoURLs, deleteUploaderImage } from '../actions';
import Uploader from '../components/Uploader';

const getUploaderImages = state => state.uploaderImages;
const getUploaderImagesUrl = state => state.uploaderImagesUrl;

const mapStateToProps = state => ({
	uploaderImages: getUploaderImages(state),
	uploaderImagesUrl: getUploaderImagesUrl(state),
});

const mapDispatchToProps = dispatch => ({
	uploadImages,
	addImages: images => dispatch(addImages(images)),
	turnImagesIntoURLs: (images, length) => dispatch(turnImagesIntoURLs(images, length)),
	deleteUploaderImage: index => dispatch(deleteUploaderImage(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
