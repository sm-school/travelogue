import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
const getUser = state=> state.user;

const mapStateToProps = state =>({
	user: getUser(state),
});
const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
