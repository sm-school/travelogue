import React from 'react';
import { connect } from 'react-redux';
import { uploadImages,addImages, turnImagesIntoURLs } from '../actions';
import Uploader from '../components/Uploader';

const getUploaderImages = state => state.uploaderImages;
const getUploaderImagesUrl = state => state.uploaderImagesUrl;

const mapStateToProps = state => ({
	uploaderImages: getUploaderImages(state),
	uploaderImagesUrl: getUploaderImagesUrl(state),
});

const mapDispatchToProps = dispatch =>({
	uploadImages,
	addImages: images => dispatch(addImages(images)),
	turnImagesIntoURLs: images => dispatch(turnImagesIntoURLs(images)),
});


export default connect (mapStateToProps, mapDispatchToProps)(Uploader);

