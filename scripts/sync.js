var shell = require('shelljs');

shell.echo('Sychronizing with AWS S3 ...');
shell.exec('aws s3 sync ./scripts s3://codebase-framework/scripts');
shell.exec('aws s3 sync ./.vscode s3://codebase-framework/vscode');
shell.echo('Completed Synchronizing with AWS S3 ...');