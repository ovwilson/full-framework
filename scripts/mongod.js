var dotenv = require('dotenv');
dotenv.config();

var shell = require('shelljs');

const DB_PATH = process.env.DB_PATH;

shell.echo('Starting Mongo Daemon ...');
shell.exec(`mongod --dbpath "${DB_PATH}" --smallfiles`);
