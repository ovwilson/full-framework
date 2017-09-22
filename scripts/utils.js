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
            const tables = Object.keys(Store.schema);
            let records = {};
            tables.map(key => {
                const record = Store.schema[key];
                let keyRecords = [];
                const seqId = new NumberGenerator();
                for (let i = 0; i < record.quantity; i++) {
                    let entry = Object.create({});
                    if (record.incrementId) { entry = Object.assign({}, { id: seqId.nextNumber }); } // Check for sequential numbering 
                    entry = Object.assign(entry, record.attributes());
                    keyRecords.push(entry);
                }
                records = Object.assign(records, { [key]: keyRecords });
            });
            setContentReducer(records);
            observer.next(`Records ready to create.`);
        });
    }

}

class NumberGenerator {
    constructor() { this.initialNumber = 0; }
    increment() { this.initialNumber++; }
    get nextNumber() { this.increment(); return this.initialNumber; }
}

const setContentReducer = (records) => Store.contents = JSON.stringify(records, null, 2);

const addReducer = () => {
    const user = Object.assign({}, { name: faker.name.findName(), email: faker.internet.email() });
    Store.users.push(user);
};

const contentReducer = (contents) => {
    const scripts = Object.assign(contents.scripts, Store.scripts);
    return Object.assign({}, contents, { scripts: scripts });
}


module.exports = {
    PackageJSON: PackageJSON,
    Seed: Seed
}