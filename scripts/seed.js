'use strict';

const Rx = require('rxjs/Rx');
const Seed = require('./utils').Seed;
const faker = require('faker');

var store = {
    fileName: 'db.json',
    fileFormat: 'utf8',
    schema: {
        users: {
            quantity: 10,
            attributes: () => Object.assign({}, { name: faker.name.findName(), email: faker.internet.email() })
        },
        settings: {
            quantity: 5,
            attributes: () => Object.assign({}, { title: faker.company.companyName(), description: faker.lorem.paragraph() })
        }
    },
    contents: ''
};

const seed = new Seed(store);

const createSeed$ = Rx.Observable.of(
    seed.addSeed$.take(1),
    seed.writeFile$.take(1))
    .concatAll()
    .subscribe(data => console.log(data));

