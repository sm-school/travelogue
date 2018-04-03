'use strict';

import PropTypes from 'prop-types';
import React from 'react';

class LandmarkSelector extends React.Component {

	componentDidMount() {
		this.props.imageMetadata(this.props.imageId);
	}

	render() {
		const imageUrl = `https://s3.us-east-2.amazonaws.com/traveluploader/${this.props.imageId}.jpg`;

		let landmarks = [];

		if (this.props.metadata.landmarks) {
			landmarks = this.props.metadata.landmarks.map( (item, i) => {
				const page = item.page.replace(/ /g, '_');
				const wikipedia = 'https://en.wikipedia.org/wiki/' + encodeURI(page);

				return <li key={i}>
					<strong><a href={wikipedia}>{item.name}</a></strong><br />
					{item.extract}
				</li>;
			});
		}

		return (
			<div class="landmark_selector">
				<h1>What's your picture of?</h1>
				<img src={imageUrl} />
				<ul>
					{landmarks}
					<li>Something else...</li>
				</ul>
			</div>
		);
	}
}

LandmarkSelector.propTypes = {
	imageId: PropTypes.string,
	imageMetadata: PropTypes.func,
	metadata: PropTypes.object,
};

export default LandmarkSelector;
