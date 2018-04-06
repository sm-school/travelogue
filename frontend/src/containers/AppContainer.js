import App from '../components/App';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
const getUser = state => state.user;

const mapStateToProps = state =>({
	user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
	fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
