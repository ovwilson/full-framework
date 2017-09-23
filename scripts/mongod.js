var shell = require('shelljs');

shell.echo('Starting Mongo Daemon ...');
shell.exec('"mongod" --dbpath "/~/documents/mongodb/data/db" --smallfiles');

//mongodb://localhost:27017