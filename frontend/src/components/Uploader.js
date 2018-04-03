import React from 'react';
import '../styles/components/Uploader.scss';
import PropTypes from 'prop-types';

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
		console.log(props.uploaderImages);
		props.addImages(files);  
		props.turnImagesIntoURLs(files);
	};
    
	const renderImages = () => {

		// Read in the image file as a data URL.
		
	
		console.log(props.uploaderImagesUrl);
		return props.uploaderImagesUrl ? props.uploaderImagesUrl.map(url=>{
			return <li><img src={url}  /></li>;
		}) : null;
	
	};

	return (
		<div>
			{/* <form onSubmit={onSubmitHandler} >
				<input name="images" multiple type="file"/>
				<button>Submit</button>
			</form> */}
			<div onDragOver={dragoverHandler} onDrop={dropHandler}>Drop files here</div>
			<ul>{renderImages()}</ul>
			<button onClick={clickHandler}>Upload</button>
		</div>
	);
}

Uploader.propTypes = {
	uploadImages: PropTypes.func,
};

export default Uploader;


