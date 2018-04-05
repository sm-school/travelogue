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
		console.log('sss',props.uploaderImages.length);
		props.turnImagesIntoURLs(files,props.uploaderImages.length);
		props.addImages(files);  
	};
    
	const renderImages = () => {

		// Read in the image file as a data URL.
		
	
		console.log(props.uploaderImagesUrl,props.uploaderImages);
		return props.uploaderImagesUrl ? props.uploaderImagesUrl.map((url,i)=>{
			return <li onClick={props.deleteUploadImage(i)}className="uploader-li"><img className="uploader-image" src={url}  /></li>;
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
	uploaderImages:PropTypes.array,
	turnImagesIntoURLs: PropTypes.func,
	addImages: PropTypes.func,
	uploaderImagesUrl: PropTypes.object,
	deleteUploadImage: PropTypes.func,
};

export default Uploader;


