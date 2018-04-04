import {
	UPDATE_LATITUDE,
	UPDATE_LONGITUDE,
	UPDATE_ZOOM,
	ADD_IMAGES,
	ADD_IMAGE_URL,
	DELETE_IMAGE,
	DELETE_IMAGE_URL,
	SAVE_USERNAME,
	UPDATE_NEXT_LOCATION,
	UPDATE_USER,
} from '../constants/action-types';
import nextLocation from '../reducers/nextLocation';

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
		images.forEach(image =>{

			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function(theFile,index) {
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
				dispatch(updateUser(data.user));
				dispatch(updateNextLocation('/dashboard'));
			});
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
			dispatch(updateUser(data.user));
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

const updateUser = (user)=>({
	type: UPDATE_USER,
	user,
});

export const fetchUser = ()=>{
	return dispatch =>{
		fetch('/api/user/login', {
			credentials: 'same-origin',
		}).then(response=>response.json())
			.then(data=>{
				if (!data) return;
				dispatch(updateUser(data.user));
		  });
	};
};
