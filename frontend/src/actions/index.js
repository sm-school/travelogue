import {
	ACCEPT_LANDMARK,
	RECEIVE_LANDMARKS,
	RECEIVE_METADATA,
	RECEIVE_LATITUDE,
	RECEIVE_LONGITUDE,
	RECEIVE_POINT,
	RECEIVE_ZOOM,
	ADD_IMAGES,
	ADD_IMAGE_URL,
	DELETE_IMAGE,
	DELETE_IMAGE_URL,
	SAVE_USERNAME,
	UPDATE_NEXT_LOCATION,
} from '../constants/action-types';

import nextLocation from '../reducers/nextLocation';

export const acceptLandmark = landmarkId => {
	return {
		type: ACCEPT_LANDMARK,
		landmarkId,
	};
};

export const imageLandmarks = imageId => {
	return (dispatch) => {
		return fetch(`/api/landmarks/${imageId}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status}: ${response.statusText}`);
				}

				return response.json();
			})
			.then( landmarks => dispatch( receiveLandmarks(landmarks) ) );
	};
};

export const imageMetadata = imageId => {
	return (dispatch) => {
		return fetch(`/api/metadata/${imageId}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status}: ${response.statusText}`);
				}

				return response.json();
			})
			.then( metadata => dispatch( receiveMetadata(metadata) ) );
	};
};

export const receiveLandmarks = landmarks => {
	return {
		type: RECEIVE_LANDMARKS,
		landmarks,
	};
};

export const receiveMetadata = metadata => {
	return {
		type: RECEIVE_METADATA,
		metadata,
	};
};

export const receiveLatitude = latitude => {
	return {
		type: RECEIVE_LATITUDE,
		latitude,
	};
};

export const receiveLongitude = longitude => {
	return {
		type: RECEIVE_LONGITUDE,
		longitude,
	};
};

export const receivePoint = point => {
	return {
		type: RECEIVE_POINT,
		latitude,
		longitude,
		title,
	};
};

export const receiveZoom = zoom => {
	return {
		type: RECEIVE_ZOOM,
		zoom,
	};
};

export const uploadImages = files => {
	const fileArray = Array.from(files);

	fileArray.forEach( file => {
		let date = new Date();
		const newName = `username_${date.getTime()}_${Math.floor(Math.random() * 100)}_${file.name}`;
		const newFile = new File([ file ], newName, { type: file.type });

		uploadToS3(newFile).then( url => {} );
	});
};

const uploadToS3 = file => {
	return getSignedRequest(file)
		.then( json => {
			uploadFile(file, json.signedRequest, json.url);
		})
		.then( url => {
			return url;
		})
		.catch( err => {
			console.error(err);
			return null;
		});
};

const getSignedRequest = file => {
	return fetch(
		`/api/sign-s3?fileName=${file.name}&fileType=${file.type}`
	).then( response => {
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

	return fetch(signedRequest, options)
		.then( response => {
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

export const registerUser = (username,password) =>{
	return dispatch => {
		fetch('/api/user/register', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			credentials: 'same-origin',
			headers: {
		  'content-type': 'application/json',
			},
		})
			.then(function(response) {
				console.log(response);
				if (response.status === 401) {
		  alert('invalid user name or password');
				} else if (response.status === 404) {
					alert('bad request');
				} else if (response.status === 400) {
					alert('user exist');
				} else {
					return response.json();
				}
			}).then(data=>{
				if (!data) return;
				dispatch(saveUsername(data.username));
				dispatch(updateNextLocation('/dashboard'));
			});
	};
};


const saveUsername = username=>{
	return {
		type: SAVE_USERNAME,
		username,
	};
};

export const loginUser = (username,password) =>{
	return dispatch =>{
		fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			credentials: 'same-origin',
			headers: {
			  'content-type': 'application/json',
			},
		}).then(function(response) {
			if (response.status === 401) {
			  alert('invalid user name or password');
			} else {
				return response.json();
			}
		  }).then(data=>{
			  if (!data) return;
			dispatch(saveUsername(data.username));
			//Change this with regexp
			const params = window.location.search.split('?ref=')[1];
			const nextUrl = params || '/dashboard';

			dispatch(updateNextLocation(nextUrl));
		  });
	};
};


export const updateNextLocation = nextLocation =>{
	return {
		type: UPDATE_NEXT_LOCATION,
		nextLocation,
	};
};

export const fetchUsername = ()=>{
	return dispatch =>{
		fetch('/api/user/username', {
			credentials: 'same-origin',
		}).then(response=>response.json())
			.then(data=>{
			  if (!data) return;
				dispatch(saveUsername(data.username));
		  });
	};
};
