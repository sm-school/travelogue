'use strict';

const fetch = require('node-fetch');
const PAGE_API = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
const REDIRECT_API = 'https://en.wikipedia.org/w/api.php?action=query&redirects&format=json&titles=';

function wikipedia (pageName) {
	return fetchPageJson(PAGE_API + encodeURI(pageName))
		.then( json => {
			if (json.query.pages['-1']) {
				throw new Error('Page not found');
			}

			let page = Object.keys(json.query.pages)[0];

			if (json.query.pages[page].extract == '') {
				return processRedirect(pageName);
			} else {
				return fetchExtract(pageName);
			}
		})
		.catch( error => {
			console.log(error);
		});
}

function fetchPageJson (url) {
	return fetch(url)
		.then( response => {
			return response.json();
		})
		.then( json => {
			return json;
		})
		.catch( error => {
			console.log(`Couldn't get data: ${error}.`);
		});
}

function processRedirect (pageName) {
	return fetchPageJson(REDIRECT_API + encodeURI(pageName))
		.then( json => {
			const redirectTo = json.query.redirects[0].to;
			return fetchExtract(redirectTo);
		})
		.catch( error => {
			// error
		});
}

function fetchExtract (pageName) {
	let output = {
		page: pageName,
	};

	return fetchPageJson(PAGE_API + encodeURI(pageName))
		.then( json => {
			const page = Object.keys(json.query.pages)[0];
			const raw = json.query.pages[page].extract;

			const extractRe = new RegExp(/^(.*?)\./);
			let extract = extractRe.exec(raw)[0];

			extract = extract.replace(/ \( listen\)/, '');
			extract = extract.replace(/\(.*?\) /, '');

			output.extract = extract;
			return output;
		})
		.catch( error => {
			console.log(error);
		});
}

module.exports = wikipedia;
