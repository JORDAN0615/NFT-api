const _ = require('lodash');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const moment = require('moment');
const { default: timestamp } = require('time-stamp');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/currentdatetime', (req, res) => {
    res.send({
        result: moment().format('YYYY/MM/DD HH:mm:ss'),
    });
});

//timestamp
app.get('/timestamp', (req, res) => {
    res.send({
        result: moment('20220101').fromNow(),
    });
});

//diff timezone
app.get('/times', (req, res) => {
    var momentLA = require('moment-timezone');
    var momentNY = require('moment-timezone');
    var momentTW = require('moment-timezone');
    var timeLA = momentLA()
        .tz('America/Los_Angeles')
        .format();
    var timeNY = momentNY()
        .tz('America/New_York')
        .format();
    var timeTW = momentTW()
        .tz('Asis/Taipei')
        .format();
    res.send({
        timeLA,
        timeNY,
        timeTW,
    });
});

/**
 * 把 fruitList 改為用 file 的方式存取
 */
//list-get/post/delete
const fruitList = [
    {
        id: 1,
        name: 'apple',
        quantity: 1,
    },
    {
        id: 2,
        name: 'banana',
        quantity: 4,
    },
];
/**
 * 改寫路徑，參照 RESTful API 的方式
 */
app.get('/fruits', (req, res) => {
    const { name, quantityMoreThan, quantityLessThan } = req.query;

    // 要交集後的結果
    let queryResults;
    if (name) {
        queryResults = fruitList.filter(singleFruitInfo => singleFruitInfo.name === name);
    }
    if (quantityMoreThan) {
        queryResults = fruitList.filter(singleFruitInfo => {
            return singleFruitInfo.quantity > quantityMoreThan;
        });
    }
    if (quantityLessThan) {
        queryResults = fruitList.filter(singleFruitInfo => {
            return singleFruitInfo.quantity < quantityLessThan;
        });
    }

    res.status(200).format({
        'application/json': function() {
            res.send({ result: queryResults });
        },
    });
});
//find item
app.get('/fruits/:id', (req, res) => {
    const { id } = req.params;
    const listitem = _.find(fruitList, function(element) {
        return element.id === parseInt(id, 10);
    });

    res.send(listitem);
});
app.post('/list', (req, res) => {
    console.log(req.body);
    list.push(req.body);
    // res.send(201);
    res.status(201).format({
        'application/json': function() {
            res.send({ result: 'successfully created' });
        },
    });
});
//fail
app.delete('/list/:item', (req, res) => {
    const item = +req.params;
    const index = list.find(j => j.item === item);
    const deleteditem = list.splice(index, 1);
    res.send(deleteditem);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
