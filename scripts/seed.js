'use strict';

const fs = require('fs');
const faker = require('faker');
const Rx = require('rxjs/Rx');

const fileName = 'db.json';
const fileFormat = 'utf8';
const numberOfUsers = 100;

var store = { users: [], contents: '' };

const addUser = () => {
    const user = Object.assign({}, { name: faker.name.findName(), email: faker.internet.email() });
    store.users.push(user);
};

const userReducer$ = Rx.Observable.create((observer) => {
    for (let i = 0; i < numberOfUsers; i++) { addUser(); }
    observer.next();
});

const setContents$ = Rx.Observable.create((observer) => {
    const users = Object.assign({}, { users: store.users });
    store.contents = JSON.stringify(users, null, 2);
    observer.next();
});

const write$ = Rx.Observable.create((observer) => { // Write Json to package.json
    fs.writeFile(fileName, store.contents, fileFormat, (err) => {
        err ? observer.error(err) : observer.next(`Successfully updated ${fileName}!`);
        !err ? createSeed$.unsubscribe() : '';
    });
});


const createSeed$ = Rx.Observable.of(userReducer$.take(1), setContents$.take(1), write$.take(1))
    .concatAll().subscribe(data => console.log(data));

