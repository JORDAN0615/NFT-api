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
      result: moment("20220101").fromNow()
    });
});


//diff timezone
app.get('/times', (req, res) => {
  var momentLA = require('moment-timezone');
  var momentNY = require('moment-timezone');
  var momentTW = require('moment-timezone');
  var timeLA = momentLA().tz("America/Los_Angeles").format();
  var timeNY = momentNY().tz("America/New_York").format();
  var timeTW = momentTW().tz("Asis/Taipei").format();
  res.send({
     timeLA,
     timeNY,
     timeTW
  })
});


//list-get/post/delete
const list = [
    {
        item: 'apple',
        quantity: 1,
    },
    {
        item: 'banana',
        quantity: 4,
    },
];
app.get('/list', (req, res) => {
    res.send(list);
})
//find item 
app.get('/list/:item', (req, res) => {
    const { item } = req.params;
    const listitem = list.find((j) => j.item === item);
    res.send(listitem);
})
app.post('/list', (req, res) => {
    console.log(req.body);
    list.push(req.body);
    res.send(201);
})
//fail
app.delete('/list', (req, res) => {
    const { item } = req.params;
    const deleted = list.find((d) => d.item === item);
    if(deleted) {
        list = list.filter(list => list.item !== item)
    }
    res.send(404);
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
