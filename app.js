const _ = require('lodash');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const moment = require('moment');
const momentTZ = require('moment-timezone');
const { default: timestamp } = require('time-stamp');
const { result } = require('lodash');
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

//timestamp --- ok 
app.get('/timestamp', (req, res) => {
    const { timestamp } = req.query;
    let time = moment.unix(timestamp).utc(8);
    let timeNow = moment();
    let duration = timeNow.diff(time,'days');
    res.status(200).format({
        'application/json': function() {
            res.send({ 
             result: duration +'days'});
    }})
 })



//diff timezone --- ok 
app.get('/times', (req, res) => {
    const { timezone } = req.query;
    const getTZ = momentTZ().tz(timezone).format();
   
    res.status(201).format({
        'application/json': function() {
            res.send({ result: timezone + ":" + getTZ});
        },
    });
});


 
//查詢水果 --- ok
app.get('/fruits', (req, res) => {
    const { name, quantityMoreThan, quantityLessThan } = req.query;
    const fs = require('fs');
    const file="./fruitList.json";
    const result=JSON.parse(fs.readFileSync(file));
    // 要交集後的結果 --- ok
    let queryResults;
    if (name) {
        queryResults = result.filter(singleFruitInfo => singleFruitInfo.name === name);
    }
    if (quantityMoreThan) {
        queryResults = result.filter(singleFruitInfo => {
            return singleFruitInfo.quantity > quantityMoreThan;
        });
    }
    if (quantityLessThan) {
        queryResults = result.filter(singleFruitInfo => {
            return singleFruitInfo.quantity < quantityLessThan;
        });
    }
    if(name && quantityLessThan){
        queryResults = result.filter(
            singleFruitInfo => singleFruitInfo.name === name && singleFruitInfo.quantity < quantityLessThan);
    }
    if (name && quantityMoreThan){
        queryResults = result.filter(
            singleFruitInfo => singleFruitInfo.name === name && singleFruitInfo.quantity > quantityMoreThan);
    }
    if (quantityLessThan && quantityMoreThan){
        queryResults = result.filter(singleFruitInfo => singleFruitInfo.quantity > quantityMoreThan && 
            singleFruitInfo.quantity < quantityLessThan);
    }
    if (name && quantityLessThan && quantityMoreThan){
        queryResults = result.filter(
            singleFruitInfo => singleFruitInfo.name === name && 
            singleFruitInfo.quantity > quantityMoreThan && 
            singleFruitInfo.quantity < quantityLessThan);
    }
    res.status(200).format({
        'application/json': function() {
            res.send({ result: queryResults });
        }
    });
});


//列出所有水果 --- ok
app.get('/fruits/getFruitsList', (req, res) => {
    const fs = require('fs');
    const file="./fruitList.json";
    const getFruitResult=JSON.parse(fs.readFileSync(file));
    res.status(201).format({
        'application/json': function() {
            res.send({ result: getFruitResult });
            console.log(getFruitResult);
        },
    });
});


//新增水果 --- ok
app.post('/fruits', (req, res) => {
    const fs = require('fs');
    const file="./fruitList.json";
    fs.readFile(file, function(err, data){
        if(err){
            return console.error(err);
        }
        var fruit = data.toString();//將二進位制的資料轉換為字串
        fruit = JSON.parse(fruit);//將字串轉換為json物件
        fruit.push(req.body);//將req.body push進陣列物件中
        var str = JSON.stringify(fruit,"","\t"); //json物件轉換成字串重新寫入json檔案中,加上(“”,“\t")來排列整齊
        fs.writeFile(file, str,function(err){    //寫入
            if(err){
                console.log(err);
            }
            res.status(201).format({
                'application/json': function() {
                    res.send({ result: 'successfully created' });
                },
            });
        })

    })
});


//刪除水果 --- ok
app.delete('/fruits/:item', (req, res) => {
    const fs = require('fs');
    const file="./fruitList.json";
    const { id, name } = req.query;
    fs.readFile(file, function(err, data){
        if(err){
            return console.error(err);
        }
        var deleteFruit = data.toString();
        deleteFruit = JSON.parse(deleteFruit);
        //把資料讀出來刪除
        for(var i = 0; i < deleteFruit.length;i++){
            if(id == deleteFruit[i].id){
                //console.log(person.data[i])
                deleteFruit.splice(i,1);
            }
        }
        
        var str = JSON.stringify(deleteFruit,"","\t");
        //然後再把資料寫進去
        fs.writeFile(file, str, function(err){
            if(err){
                console.error(err);
            } 
            res.status(200).format({
                'application/json': function() {
                    res.send({ result: 'successfully deleted' });
                },
            });
        })
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
