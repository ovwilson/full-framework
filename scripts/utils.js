'use strict';

const fs = require('fs');
const Rx = require('rxjs/Rx');
const faker = require('faker');

var Store;

class Files {

    constructor(store) { Store = store; }

    get readFile$() {
        return Rx.Observable.create((observer) => { // Read package.json file contents
            fs.readFile(Store.fileName, Store.fileFormat, (err, file) => {
                err ? observer.error(err) : Store.file = file;
                !err ? observer.next(`Reading ${Store.fileName} ...`) : '';
            });
        });
    }

    get writeFile$() {
        return Rx.Observable.create((observer) => { // Write Json to package.json
            fs.writeFile(Store.fileName, Store.contents, Store.fileFormat, (err) => {
                err ? observer.error(err) : observer.next(`Successfully updated ${Store.fileName}!`);
            });
        });
    }

}

class PackageJSON extends Files {

    constructor(store) { super(store); }

    get fileContents$() {
        return Rx.Observable.create((observer) => { // Set json to npm script values
            let contents = JSON.parse(Store.file);
            Store.contents = JSON.stringify(contentReducer(contents), null, 2);
            observer.next(`Set ${Store.fileName} attributes ...`);
        });
    }
}

class Seed extends Files {

    constructor(store) { super(store); }

    get addSeed$() {
        return Rx.Observable.create((observer) => {
            for (let i = 0; i < Store.numberOfUsers; i++) { addUserReducer(); }
            observer.next(`${Store.numberOfUsers} users ready to create.`);
        });
    }

    get userContent$() {
        return Rx.Observable.create((observer) => {
            const users = Object.assign({}, { users: Store.users });
            Store.contents = JSON.stringify(users, null, 2);
            observer.next(`User contents string ready.`);
        });
    }

}

const contentReducer = (contents) => {
    const scripts = Object.assign(contents.scripts, Store.scripts);
    return Object.assign({}, contents, { scripts: scripts });
}

const addUserReducer = () => {
    const user = Object.assign({}, { name: faker.name.findName(), email: faker.internet.email() });
    Store.users.push(user);
};

module.exports = {
    PackageJSON: PackageJSON,
    Seed: Seed
}