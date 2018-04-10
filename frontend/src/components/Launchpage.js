import React from 'react';
import '../styles/components/Launchpage.scss';

const Launchpage = () => {

	var divStyle = {
		backgroundImage: 'url(https://s3.us-east-2.amazonaws.com/traveluploader/frontbanner.jpg)',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		'backgroundSize': 'cover',
		'zIndex': -1,
	};
      

	return (
		<div>
			<section className="hero">
				<div className="background-image" style={divStyle}/>
				<div className="hero-content-area">
					<h1>Photo sharing, but better!</h1>
					<h3 id="tag">Secure cloud storage. Built in location & landmark recognition.</h3>
					<a href="/register" className="button-register">Start sharing now!</a>
				</div>
			</section>
			<section2 className="blurb">
				<h3 className="title">They say a picture tells a thousand words. Ours tell more.</h3>
				<p>
                    We're a free photo sharing platform with added intelligence. Our super
                    smart technology maps your photo journey and describes landmarks,
                    making photo sharing even more fun! Upload your photos to our cloud
                    and we'll do the rest!
				</p>
				<a href="/register" className="button-register">It's free to use!</a>
			</section2>
			<section3 className="footer">
				<p>
				</p>
			</section3>
		</div>
	);
};

export default Launchpage;
