import React from 'react';
import '../styles/components/Uploader.scss';
import PropTypes from 'prop-types';

function Uploader(props) {

	const onSubmitHandler = event => {
		event.preventDefault();
		const files = event.target.images.files;
		if (!files || !files.length) {
			return;
		}

		props.uploadImages(files);
	};

	return (
		<div>
			<form onSubmit={onSubmitHandler} >
				<input name="images" multiple type="file"/>
				<button>Submit</button>
			</form>
		</div>
	);
}

Uploader.propTypes = {
	uploadImages: PropTypes.func,
};

export default Uploader;


