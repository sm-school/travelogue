import {
	RECEIVE_TRIP,
	RECEIVE_TRIP_LANDMARKS,
} from '../constants/action-types';

export const fetchTrip = (tripId) => {
	return dispatch => {
		fetch(`/api/trip/images/${tripId}`, { credentials: 'same-origin' })
			.then( response => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`);
				return response.json();
			}).then( data => {
				dispatch(receiveTrip(data));
			});
	};
};

export const fetchTripLandmarks = (tripId) => {
	return dispatch => {
		fetch(`/api/trip/landmarks/${tripId}`, { credentials: 'same-origin' })
			.then( response => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`);
				return response.json();
			}).then( data => {
				dispatch(receiveTripLandmarks(data));
			});
	};
};

const receiveTrip = (trip) => ({
	type: RECEIVE_TRIP,
	trip,
});

const receiveTripLandmarks = (landmarks) => ({
	type: RECEIVE_TRIP_LANDMARKS,
	landmarks,
});
