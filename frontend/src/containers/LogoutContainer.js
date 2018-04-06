import React from 'react';
import { connect } from 'react-redux';
import Logout from '../components/Logout';
import { logoutUser } from '../actions/index';

const getEmail = state=>{
	console.log(state);
	return state.email;
};

const mapStateToProps = state =>({
	email: getEmail(state),
});

const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logout);
