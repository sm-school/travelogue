import {
	UPDATE_LATITUDE,
	UPDATE_LONGITUDE,
	UPDATE_ZOOM,
	SAVE_USERNAME,
	UPDATE_NEXT_LOCATION,
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
