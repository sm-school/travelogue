import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import { turnMenuOff } from '../actions/';
const getUser = state => state.user;

const mapStateToProps = state => ({
	user: getUser(state),
});
const mapDispatchToProps = dispatch => ({
	turnMenuOff: () => dispatch(turnMenuOff()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
