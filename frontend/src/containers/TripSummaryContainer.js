import { connect } from 'react-redux';
import { fetchTripSummary } from '../actions';
import TripSummary from '../components/TripSummary';

const getTrip = (state) => {
	return state.tripInfo;
};

const mapStateToProps = state => ({
	trip: getTrip(state),
});

const mapDispatchToProps = dispatch => ({
	fetchTripSummary: () => dispatch(fetchTripSummary()),
});

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(TripSummary);
