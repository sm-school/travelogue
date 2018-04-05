import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions';
import Register from '../components/Register';

const getMap = (state) => {
	return state.map;
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ( {
	registerUser: (username, password)=> dispatch(registerUser(username, password)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
