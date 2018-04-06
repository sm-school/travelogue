import React, { Component } from 'react';

import PropTypes from 'prop-types';
import NavigationContainer from '../containers/NavigationContainer';

import '../styles/components/Main.scss';
const Main = (props)=> {
	return (
		<div>
			<NavigationContainer/>
			<div className='main__children_wrapper'>
				<div className="main__children">
					{props.children}
				</div>
			</div>			
				
			<div className="container">
				{props.children}
			</div>
		</div>
	);
};

Main.propTypes = {
	children: PropTypes.array,
};
export default Main;
