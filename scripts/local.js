var shell = require('shelljs');

shell.echo('Install Local Dependencies ...');
shell.exec('yarn add shelljs @ngrx/core @ngrx/store@2.2.3 @ngrx/effects@2.0.4 @ngrx/store-devtools@3.2.4');
shell.echo('Completed Local Dependencies ...');