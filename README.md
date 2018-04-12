# Travelogue

## A photojournalling application for travellers

**Built by [@team-travelogue](https://github.com/team-travelogue/) in the
first cohort of [@constructorlabs](https://github.com/constructorlabs/), 
Spring 2018**

_Travelogue, n.: A film, book, or illustrated lecture about the places visited
by or experiences of a traveller._ - Oxford Dictionaries

**Travelogue** is a photo hosting service that differs from traditional
photo hosting by leveraging the power of Web services to derive and present
contextual information for your shots. When you upload, Travelogue connects to
the [Google Cloud Vision API](https://cloud.google.com/vision/) to find out
what your photo is of, and retrieves information about that place from
[Wikipedia](https://en.wikipedia.org/wiki/) to present alongside it. Your
photos themselves are securely stored in [Amazon S3
Storage](https://aws.amazon.com/s3/).

Travelogue is a JavaScript application built on a tech stack of:

* [Redux](https://redux.js.org/)
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.com/)
* [PostgreSQL](https://postgresql.org/)
* [Heroku](https://heroku.com/)
* [AWS Lambda](https://aws.amazon.com/lambda/)

Utilising:

* [Babel](https://babeljs.io/)
* [Sass](https://sass-lang.com/)
* [Webpack](https://webpack.js.org/)

Tested with:

* [ESLint](https://eslint.org/)
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](https://github.com/airbnb/enzyme)
* [Travis CI](https://travis-ci.org/)

And featuring:

* [Mapbox](https://mapbox.com/), [Leaflet](http://leafletjs.com/), and
[react-leaflet](https://react-leaflet.js.org/)
