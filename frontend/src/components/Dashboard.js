import React from 'react';
import PropTypes from 'prop-types';
import UploaderContainer from '../containers/UploaderContainer';

import '../styles/components/Uploader.scss';

const Dashboard = props => {
	const name = props.user.first_name
		? props.user.first_name
		: props.user.email;

	return (
		<div className="dashboard">
			<h1 className="dashboard-title">Welcome {name}</h1>
			<UploaderContainer />
		</div>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

export default Dashboard;
