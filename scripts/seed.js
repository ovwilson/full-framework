'use strict';

const Rx = require('rxjs/Rx');
const Seed = require('./utils').Seed;

var store = { 
    fileName: 'db.json',
    fileFormat: 'utf8',
    numberOfUsers: 50,
    users: [], 
    contents: '' 
};

const seed = new Seed(store);

const createSeed$ = Rx.Observable.of(
    seed.addSeed$.take(1), 
    seed.userContent$.take(1), 
    seed.writeFile$.take(1))
    .concatAll()
    .subscribe(data => console.log(data));

