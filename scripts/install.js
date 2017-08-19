var shell = require('shelljs');

shell.echo('Install files from AWS S3 ...');
shell.exec('aws s3 cp s3://codebase-framework/scripts ./scripts --recursive');
shell.exec('aws s3 cp s3://codebase-framework/vscode ./.vscode --recursive');
shell.echo('Completed Install files from AWS S3 ...');