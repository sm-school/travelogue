'use strict';

const pg = require('pg-promise')();
const env = require('./env');

export const db = pg(env.DB_URL);