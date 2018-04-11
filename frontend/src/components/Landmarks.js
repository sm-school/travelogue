import PropTypes from 'prop-types';
import React from 'react';

function Landmarks (props) {
	const landmarks = props.landmarks.map( (item, i) => {
		const page = item.page.replace(/ /g, '_');
		const wikipedia = 'https://en.wikipedia.org/wiki/' + encodeURI(page);

		return <li key={i}>
			<a href={wikipedia}>
				<strong>{item.name}</strong><br />
				{item.extract}
			</a>
		</li>;
	});

	return (
		<div>
			<h2>Shown in this photo:</h2>
			<ul className="landmarks_list">
				{landmarks}
			</ul>
		</div>
	);
}

Landmarks.propTypes = {
	landmarks: PropTypes.array,
};

export default Landmarks;
