var shell = require('shelljs');

shell.echo('Install Local Dependencies ...');
shell.exec(`yarn add @ngrx/store @ngrx/effects @ngrx/store-devtools`);
shell.exec(`yarn add @angular/flex-layout @angular/material @angular/cdk`);
shell.exec(`yarn add shelljs concurrently json-server faker --dev`);
shell.echo('Completed Local Dependencies ...');