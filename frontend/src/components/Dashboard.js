import React from 'react';
import PropTypes from 'prop-types';
import UploaderContainer from '../containers/UploaderContainer';

const Dashboard = props => {
	const name = props.user.first_name
		? props.user.first_name
		: props.user.email;

	return (
		<div>
			<h1>Welcome {name}</h1>
			<UploaderContainer />
		</div>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
