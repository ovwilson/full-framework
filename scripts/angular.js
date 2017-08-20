var shell = require('shelljs');

console.log(__dirname);

shell.echo('Install Angular ...');
//shell.exec('ng new dir --directory ./');
shell.exec('aws s3 cp s3://codebase-framework/app-root ./src/app --recursive');
shell.echo('Completed Angular Install ...');