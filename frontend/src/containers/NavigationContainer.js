import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import { logoutUser } from '../actions/';
const getUser = state => state.user;

const mapStateToProps = state => ({
	user: getUser(state),
});
const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
