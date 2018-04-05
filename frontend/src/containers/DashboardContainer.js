import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

const getUser = state => {
	return state.user;
};

const mapStateToProps = state => ({
	user: getUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
