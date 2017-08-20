var shell = require('shelljs');

shell.echo('Install Local Dependencies ...');
shell.exec(`yarn add @ngrx/core @ngrx/store@2.2.3 @ngrx/effects@2.0.4 @ngrx/store-devtools@3.2.4`);
shell.exec(`yarn add @angular/flex-layout @angular/material`);
shell.exec(`yarn add shelljs concurrently json-server faker --dev`);
shell.echo('Completed Local Dependencies ...');