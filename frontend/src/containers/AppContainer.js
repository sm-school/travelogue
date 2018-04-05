import App from '../components/App';
import { connect } from 'react-redux';
import { fetchUsername } from '../actions/index';
const getUser = state=> state.user;

const mapStateToProps = state =>({
	user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
	fetchUsername: ()=> dispatch(fetchUsername()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
