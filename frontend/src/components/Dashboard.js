import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {

	componentDidMount() {
		if (this.props.username == '') this.props.fetchUsername();
	}
	render() {
		return (<h1>Welcome {this.props.username}</h1>);
	}
};

Dashboard.propTypes = {
	username: PropTypes.string,
	fetchUsername: PropTypes.func,
};

export default Dashboard;
