import { connect } from 'react-redux';
import { fetchTrip } from '../actions/trip';
import Trip from '../components/Trip';

const getTrip = (state) => {
	return state.trip;
};

const getUser = state => {
	return state.user;
};

const mapStateToProps = state => ({
	trip: getTrip(state),
	user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
	fetchTrip: userId => dispatch(fetchTrip(userId)),
	setTrip: trip => dispatch(receiveTrip(trip)),
});

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(Trip);
