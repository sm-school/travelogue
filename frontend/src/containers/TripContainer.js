import { connect } from 'react-redux';
import { fetchTrip } from '../actions/trip';
import Trip from '../components/Trip';

const getTrip = (state) => {
	return state.trip;
};

const mapStateToProps = state => ({
	trip: getTrip(state),
});

const mapDispatchToProps = dispatch => ({
	fetchTrip: tripId => dispatch(fetchTrip(tripId)),
	setTrip: trip => dispatch(receiveTrip(trip)),
});

function mergeProps(stateProps, dispatchProps, ownProps) {
	let merged = Object.assign({}, ownProps, stateProps, dispatchProps);

	return Object.assign({}, merged, {
		tripId: stateProps.tripId || ownProps.tripId,
	});
}

export default connect (
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Trip);
