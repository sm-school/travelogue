import { connect } from 'react-redux';
import { toggleMenu, logoutUser } from '../actions/index';
import UserMenu from '../components/UserMenu';

const getUserMenu = state=> state.userMenu;
const getUser = state => state.user;

const mapStateToProps = state =>({
	userMenu: getUserMenu(state),
	user: getUser(state),
});
const mapDispatchToProps = dispatch =>({
	toggleMenu: () => dispatch(toggleMenu()),
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
