import React from 'react';
import PropTypes from 'prop-types';
import UploaderContainer from '../containers/UploaderContainer';

const Dashboard = props => {
	return (
		<div>
			<h1>Welcome {`${props.user.loggedIn}`}</h1>
			<UploaderContainer />
		</div>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
