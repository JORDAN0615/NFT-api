const express = require('express');
const moment = require('moment');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/currentdatetime', (req, res) => {
    res.send({
        result: moment().format('YYYY/MM/DD HH:mm:ss'),
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
