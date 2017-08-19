'use strict';

const fs = require('fs');
const Rx = require('rxjs/Rx');

const fileName = 'package.json';
const fileFormat = 'utf8';

var store = {
    file: '',
    contents: '',
    scripts: {
        'scripts:install': 'node scripts//install',
        'scripts:sync': 'node scripts//sync',
        'scripts:create:seed': 'node scripts//seed',
        'scripts:package:json:install': 'node scripts//package-json',
    }
};

const read$ = Rx.Observable.create((observer) => { // Read package.json file contents
    fs.readFile(fileName, fileFormat, (err, file) => {
        err ? observer.error(err) : store.file = file;
        !err ? observer.next(`Reading ${fileName} ...`) : '';
    });
});

const getAttrs$ = Rx.Observable.create((observer) => { // Set json to npm script values
    let contents = JSON.parse(store.file), stringContents;
    stringContents = JSON.stringify(setContents(contents), null, 2);
    store.contents = stringContents;
    observer.next(`Setting ${fileName} attributes ...`);
});

const setContents = (contents) => { // Serves as a reducer
    const scripts = Object.assign(contents.scripts, store.scripts);
    return Object.assign({}, contents, { scripts: scripts });
}

const write$ = Rx.Observable.create((observer) => { // Write Json to package.json
    fs.writeFile(fileName, store.contents, fileFormat, (err) => {
        err ? observer.error(err) : observer.next(`Successfully updated ${fileName}!`);
        !err ? updatePackageJson$.unsubscribe() : '';
    });
});

const updatePackageJson$ = Rx.Observable.of(read$.take(1), getAttrs$.take(1), write$.take(1))
    .concatAll().subscribe(data => console.log(data));

