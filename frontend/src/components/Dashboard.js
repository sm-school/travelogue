import React from 'react';
import PropTypes from 'prop-types';
import UploaderContainer from '../containers/UploaderContainer';
class Dashboard extends React.Component {

	componentDidMount() {
		if (this.props.username == '') {
			this.props.fetchUsername();
		}
	}
	render() {
		console.log('rendered');
		return (<div>
			<h1>Welcome {this.props.username}</h1>
			<UploaderContainer/>
		</div>);
	}
};

Dashboard.propTypes = {
	username: PropTypes.string,
	fetchUsername: PropTypes.func,
};

export default Dashboard;
