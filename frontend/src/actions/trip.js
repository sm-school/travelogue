import { RECEIVE_TRIP } from '../constants/action-types';

// Trips not yet implemented in database. For the time being,
// get all images associated with a user ID
export const fetchTrip = (userId) => {
	return dispatch => {
		fetch(`/api/trip/userImages/${userId}`, { credentials: 'same-origin' })
			.then( response => {
				if (!response.ok)
				 	throw new Error(`${response.status}: ${response.statusText}`);

				return response.json();
			}).then( data => dispatch(receiveTrip(data)) );
	};
};

const receiveTrip = (trip) => {
	type: RECEIVE_TRIP,
	trip;
};
