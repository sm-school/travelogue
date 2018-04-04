import React from 'react';
import PropTypes from 'prop-types';
class ConnectedRouter extends React.Component {

	componentWillReceiveProps(NextProps) {
		if (NextProps.nextLocation !== this.props.nextLocation) {
			this.props.history.push(NextProps.nextLocation);
		}
	}
	render() {
		return null;
	}
   
}

ConnectedRouter.propTypes = {
	nextLocation: PropTypes.string,
	history: PropTypes.object,
	'history.push': PropTypes.func,
};
export default ConnectedRouter;
