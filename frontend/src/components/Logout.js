import React from 'react';
import PropTypes from 'prop-types';

class Logout extends React.Component {

	componentDidMount() {
		this.props.logoutUser();
	}

	render() {
		return (
			<h1>logged out </h1>
		);
	}
};
  
Logout.propTypes = {
	logoutUser: PropTypes.func,
};

export default Logout;
