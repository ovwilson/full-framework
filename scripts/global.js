var shell = require('shelljs');

shell.echo('Install Global Dependencies ...');
shell.exec('npm install -g angular/cli yarn typescript tslint');
shell.echo('Completed Global Dependencies ...');