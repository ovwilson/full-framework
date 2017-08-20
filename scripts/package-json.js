'use strict';

const Rx = require('rxjs/Rx');
const PackageJSON = require('./utils').PackageJSON;

const store = {
    fileName: 'package.json',
    fileFormat: 'utf8',
    file: '',
    contents: '',
    scripts: {
        'scripts:install': 'node scripts//install',
        'scripts:sync': 'node scripts//sync',
        'scripts:seed': 'node scripts//seed',
        'scripts:package:json': 'node scripts//package-json',
        'scripts:local':'node scripts//local',
        'scripts:global': 'node scripts//global',
        'scripts:angular':'node scripts//angular',
        'start:json:server':'json-server --watch db.json'
    }
};

const packageJson = new PackageJSON(store);

const updatePackageJson$ = Rx.Observable.of(
    packageJson.readFile$.take(1),
    packageJson.fileContents$.take(1),
    packageJson.writeFile$.take(1))
    .concatAll()
    .subscribe(data => console.log(data));

