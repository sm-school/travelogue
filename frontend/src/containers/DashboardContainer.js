import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchUsername } from '../actions/index';
const getUsername = state=>{
	return state.username;
};
const mapStateToProps = state =>({
	username: getUsername(state),
});

const mapDispatchToProps = dispatch =>({
	fetchUsername: ()=> dispatch(fetchUsername()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
