import { RECEIVE_TRIP } from '../constants/action-types';

export const fetchTrip = (tripId) => {
	return dispatch => {
		fetch(`/api/trip/${tripId}`, { credentials: 'same-origin' })
			.then( response => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`);
				return response.json();
			}).then( data => {
				dispatch(receiveTrip(data));
			});
	};
};

const receiveTrip = (trip) => ({
	type: RECEIVE_TRIP,
	trip,
});
