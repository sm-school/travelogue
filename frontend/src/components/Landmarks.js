import PropTypes from 'prop-types';
import React from 'react';

function Landmarks (props) {
	const landmarks = props.landmarks.map( (item, i) => {
		const page = item.page.replace(/ /g, '_');
		const wikipedia = 'https://en.wikipedia.org/wiki/' + encodeURI(page);

		return <li key={i}>
			<strong><a href={wikipedia}>{item.name}</a></strong><br />
			{item.extract}
		</li>;
	});

	return (
		<div className="landmarks">
			<h2>Shown in this photo:</h2>
			<ul>
				{landmarks}
			</ul>
		</div>
	);
}

Landmarks.propTypes = {
	landmarks: PropTypes.array,
};

export default Landmarks;
