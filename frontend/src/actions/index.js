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
	DELETE_UPLOADER_IMAGE,
	SAVE_LOGGED_IN_USER,
	UPDATE_NEXT_LOCATION,
	TRIP_SUMMARY,
	RESET_USER,
	TURN_MENU_ON, 
	TURN_MENU_OFF, 
	TOGGLE_MENU,
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
		return fetch(`/api/image/landmarks/${imageId}`)
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
		return fetch(`/api/image/metadata/${imageId}`)
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

export const uploadImages = fileArray => {
	fileArray.forEach( file => {
		let date = new Date();
		const newName = `${date.getTime()}_${Math.floor(Math.random() * 100)}_${file.name}`;
		const newFile = new File([ file ], newName, { type: file.type });

		uploadToS3(newFile)
			.then( fileName => {
				return storeImageData( {
					fileName,
					latitude: undefined,
					longitude: undefined,
				});
			});
	});
};

const uploadToS3 = file => {
	return getSignedRequest(file)
		.then( json => {
			return uploadFile(file, json.signedRequest, json.url);
		})
		.then( fileName => {
			return fileName;
		})
		.catch( err => {
			console.error(err);
			return null;
		});
};

const uploadFile = (file, signedRequest, url) => {
	const options = {
		method: 'PUT',
		body: file,
	};

	return fetch(signedRequest, options)
		.then( response => {
			if (!response.ok) {
				throw new Error(`${response.status}: ${response.statusText}`);
			}
			return file.name;
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

const storeImageData = (imageData) => {
	return fetch('/api/image/store', {
		method: 'POST',
		body: JSON.stringify(imageData),
		credentials: 'same-origin',
		headers: {
		  'content-type': 'application/json',
		},
	})
		.then( response => {
			return response.json();
		})
		.catch( error => {
			console.log(error);
		});
};

export const addImages = images => ({
	type: ADD_IMAGES,
	images,
});

const addUploaderImagesUrl = (url, index) => ({
	type: ADD_IMAGE_URL,
	url,
	index,
});

export const turnImagesIntoURLs = (images, length) => {
	return dispatch => {
		let index = length;
		images.forEach(image =>{

			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = ( (theFile, index) => {
				return function(e) {
					dispatch(addUploaderImagesUrl(e.target.result, index));
				};
			} )(image, index);

			reader.readAsDataURL(image);
			index += 1;
		});
	};
};



export const deleteUploaderImage = index =>({
	type: DELETE_UPLOADER_IMAGE,
	index,
});

export const registerUser = (email, password) =>{
	return dispatch => {
		fetch('/api/user/register', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			credentials: 'same-origin',
			headers: {
		  'content-type': 'application/json',
			},
		})
			.then( response => {
				if (response.status === 401) {
					alert('Invalid user name or password');
				} else if (response.status === 404) {
					alert('Bad request');
				} else if (response.status === 400) {
					alert('User exists');
				} else {
					return response.json();
				}
			}).then( data => {
				if (!data) return;
				dispatch(saveLoggedInUser(data));
				dispatch(updateNextLocation('/dashboard'));
			});
	};
};

export const loginUser = (email, password) =>{
	return dispatch =>{
		fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
		}).then( response => {
			if (response.status === 401) {
				alert('invalid user name or password');
			} else {
				return response.json();
			}
		}).then( data => {
			if (!data) return;
			dispatch(saveLoggedInUser(data));
			
			// To do: change this with regexp
			const params = window.location.search.split('?ref=')[1];
			const nextUrl = params || '/dashboard';
			dispatch(updateNextLocation(nextUrl));
		});
	};
};

export const logoutUser = () =>{
	return dispatch => {
		fetch('/api/user/logout', {
			credentials: 'same-origin',
		}).then(function(result) {
			dispatch(resetUser());
			dispatch(updateNextLocation('/'));
		});
	};
};

const resetUser = ()=>({
	type: RESET_USER,
});


export const updateNextLocation = nextLocation =>{
	return {
		type: UPDATE_NEXT_LOCATION,
		nextLocation,
	};
};
	
const saveLoggedInUser = user => ({
	type: SAVE_LOGGED_IN_USER,
	user,
});

export const fetchUser = () => {
	return dispatch => {
		fetch('/api/user/check', {
			credentials: 'same-origin',
		}).then( response => {
			if (response.status !== 404) {
				return response.json();
			}
		}).then( data => {
			if (!data) return ;
			dispatch(saveLoggedInUser(data));
		});
	};
};

export const fetchTripSummary = () => {
	return dispatch => {
		fetch('/api/image/trip', {
			credentials: 'same-origin',
		}).then( response => {
			if (response.status !== 404) {
				return response.json();
			}
		}).then( data => {
			if (!data) return;

			dispatch(tripSummary(data.tripSummary)); //confirm returned object from db
		});
	};
};

const tripSummary = (tripInfo) => {
	type: TRIP_SUMMARY,
	tripInfo;
};

export const turnMenuOn = ()=>({
	type: TURN_MENU_ON,
});
export const turnMenuOff = ()=>({
	type: TURN_MENU_OFF,
});
export const toggleMenu = ()=>({
	type: TOGGLE_MENU,
});
