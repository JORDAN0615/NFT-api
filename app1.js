const _ = require('lodash');
const express = require('express');
const app = express();
const port = 3000;
const appRouter = require('./src/routes/app.route');


app.use(express.json());
app.use(express.urlencoded());

//讀取router
app.use('/fruits', appRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    return;
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});