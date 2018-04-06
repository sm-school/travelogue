import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import Login from '../components/Login';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ( {
	loginUser: (email, password)=>dispatch(loginUser(email, password)),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
