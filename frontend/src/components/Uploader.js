import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Uploader.scss';

function Uploader(props) {

	const clickHandler = () => {
		if (!props.uploaderImages || !props.uploaderImages.length) {
			return;
		}

		props.uploadImages(props.uploaderImages);
	};

	const dragoverHandler = (event) => {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	};

	const dropHandler = (event) => {
		event.stopPropagation();
		event.preventDefault();
		let files = Array.from(event.dataTransfer.files);
		files = files.filter(file => file.type.match('image.*'));
		props.turnImagesIntoURLs(files, props.uploaderImages.length);
		props.addImages(files);
	};

	const renderImages = () => {
		// Read in the image file as a data URL.
		return props.uploaderImagesUrl ? props.uploaderImagesUrl.map( (url, i) => {
			return <li key={i} onClick={props.deleteUploadImage(i)}><img src={url} /></li>;
		} ) : null;

	};

	return (
		<div className="uploader">
			{/* <form onSubmit={onSubmitHandler} >
				<input name="images" multiple type="file"/>
				<button>Submit</button>
			</form> */}
			<div className="drag-area" onDragOver={dragoverHandler} onDrop={dropHandler}>Drop your<br />photos here</div>
			<button onClick={clickHandler}>Upload</button>
			<ul className="upload-queue">{renderImages()}</ul>
		</div>
	);
}

Uploader.propTypes = {
	addImages: PropTypes.func,
	deleteUploadImage: PropTypes.func,
	turnImagesIntoURLs: PropTypes.func,
	uploaderImages: PropTypes.array,
	uploaderImagesUrl: PropTypes.array,
	uploadImages: PropTypes.func,
	uploaderImages:PropTypes.array,
	turnImagesIntoURLs: PropTypes.func,
	addImages: PropTypes.func,
	uploaderImagesUrl: PropTypes.array,
	deleteUploadImage: PropTypes.func,
};

export default Uploader;
