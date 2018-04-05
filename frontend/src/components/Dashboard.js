import React from 'react';
import PropTypes from 'prop-types';
import UploaderContainer from '../containers/UploaderContainer';
class Dashboard extends React.Component {

	componentDidMount() {
		if (this.props.email == '') {
			this.props.fetchEmail();
		}
	}
	render() {
		console.log('rendered');
		return (<div>
			<h1>Welcome {this.props.email}</h1>
			<UploaderContainer/>
		</div>);
	}
};

Dashboard.propTypes = {
	email: PropTypes.string,
	fetchEmail: PropTypes.func,
};

export default Dashboard;
