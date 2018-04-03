import {
	UPDATE_LATITUDE,
	UPDATE_LONGITUDE,
	UPDATE_ZOOM,
	ADD_IMAGES,
	ADD_IMAGE_URL,
	DELETE_IMAGE,
	DELETE_IMAGE_URL,
} from '../constants/action-types';

export const updateLatitude = latitude => {
	return {
		type: UPDATE_LATITUDE,
		latitude,
	};
};

export const updateLongitude = longitude => {
	return {
		type: UPDATE_LONGITUDE,
		longitude,
	};
};

export const updateZoom = zoom => {
	return {
		type: UPDATE_ZOOM,
		zoom,
	};
};

export const uploadImages = fileArray => {
	fileArray.forEach(file => {
	    let date = new Date();
	    const newName = `username_${date.getTime()}_${Math.floor(Math.random() * 100)}_${file.name}`;
	    const newFile = new File([ file ], newName, {
	        type: file.type,
	    });
	    uploadToS3(newFile).then(url => {});
	});
};

const uploadToS3 = file => {
	return getSignedRequest(file)
		.then(json => uploadFile(file, json.signedRequest, json.url))
		.then(url => {
			return url;
		})
		.catch(err => {
			console.error(err);
			return null;
		});
};

const getSignedRequest = file => {
	return fetch(
		`/api/sign-s3?fileName=${file.name}&fileType=${file.type}`
	).then(response => {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
		return response.json();
	});
};

const uploadFile = (file, signedRequest, url) =>{
	const options = {
		method: 'PUT',
		body: file,
	};

	return fetch(signedRequest, options).then(response => {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
		return url;
	});
};


export const addImages = (images) =>({
	type: ADD_IMAGES,
	images,
});

const addUploaderImagesUrl = (url,index) =>({
	type: ADD_IMAGE_URL,
	url,
	index,
});


export const turnImagesIntoURLs = (images,length) =>{
	return dispatch => {
		let index = length;
		console.log(index);
		images.forEach(image =>{

			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function(theFile,index) {
                
				console.log(theFile);
				console.log(index);
				return function(e) {
					dispatch(addUploaderImagesUrl(e.target.result,index));
				};
			})(image,index);
			reader.readAsDataURL(image);
			index += 1;
		});
	};
};

const deleteImages = (index) =>({
	type: DELETE_IMAGE,
	index,
});

const deleteUploaderImagesUrl = (index) =>({
	type: DELETE_IMAGE_URL,
	index,
});

export const deleteUploadImage = index =>{
	return dispatch => {
		dispatch(deleteImages(index));
		dispatch(deleteUploaderImagesUrl(index));
	};
};
