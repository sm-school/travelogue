import { RECEIVE_TRIP } from '../constants/action-types';

export const fetchTrip = (tripId) => {
	return dispatch => {
		console.log('Trip ID is:', tripId);
		fetch(`/api/trip/${tripId}`, { credentials: 'same-origin' })
			.then( response => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`);
				return response.json();
			}).then( data => {
				console.log(data);
				dispatch(receiveTrip(data));
			});
	};
};

const receiveTrip = (trip) => ({
	type: RECEIVE_TRIP,
	trip,
});
