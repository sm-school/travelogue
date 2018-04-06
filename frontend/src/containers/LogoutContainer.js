import React from 'react';
import { connect } from 'react-redux';
import Logout from '../components/Logout';
import { logoutUser } from '../actions/index';

const mapStateToProps = {};

const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logout);
