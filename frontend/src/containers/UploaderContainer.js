import React from 'react';
import { connect } from 'react-redux';
import { uploadImages } from '../actions';
import Uploader from '../components/Uploader';

const mapStateToProps = null;
const mapDispatchToProps = dispatch =>({
	uploadImages,
});

export default connect (mapStateToProps, mapDispatchToProps)(Uploader);

