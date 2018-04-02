import React from 'react';

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

export default ConnectedRouter;
