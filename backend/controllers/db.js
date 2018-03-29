'use strict';

const pg = require('pg-promise')();
const env = require('../configs/env');

const db = pg(env.DB_URL);

module.exports = db;
