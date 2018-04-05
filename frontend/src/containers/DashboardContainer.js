import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchEmail } from '../actions/index';
const getEmail = state=>{
	return state.email;
};
const mapStateToProps = state =>({
	email: getEmail(state),
});

const mapDispatchToProps = dispatch =>({
	fetchEmail: ()=> dispatch(fetchEmail()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
