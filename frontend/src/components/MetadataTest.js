'use strict';

import PropTypes from 'prop-types';
import React from 'react';

class MetadataTest extends React.Component {

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

		const style = {
			float: 'left',
			marginRight: '2em',
			marginTop: '1em',
		 };

		return (
			<div>
				<img src={imageUrl} width={300} style={style} />
				<ul>
					{landmarks}
				</ul>
			</div>
		);
	}
}

MetadataTest.propTypes = {
	imageId: PropTypes.string,
	imageMetadata: PropTypes.func,
	metadata: PropTypes.object,
};

export default MetadataTest;
