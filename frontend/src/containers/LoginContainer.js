import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import Login from '../components/Login';

const getMap = (state) => {
	return state.map;
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ( {
	loginUser: (username, password) => dispatch(loginUser(username, password)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
