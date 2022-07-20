const fs = require('fs');
const readFruitList="./fruitList.json";

function getResult(query){
    const { name, quantityMoreThan, quantityLessThan } = query;
    const getFruitListResult=JSON.parse(fs.readFileSync(readFruitList));
    let queryResults = getFruitListResult;
    if (name) {
        queryResults = getFruitListResult.filter(singleFruitInfo => singleFruitInfo.name === name);
    }
    if (quantityMoreThan) {
        queryResults = getFruitListResult.filter(singleFruitInfo => {
            return singleFruitInfo.quantity > quantityMoreThan;
        });
    }
    
    if (quantityLessThan) {
        queryResults = getFruitListResult.filter(singleFruitInfo => {
            return singleFruitInfo.quantity < quantityLessThan;
        });
    }
    if(name && quantityLessThan){
        queryResults = getFruitListResult.filter(
            singleFruitInfo => singleFruitInfo.name === name && singleFruitInfo.quantity < quantityLessThan);
    }
    if (name && quantityMoreThan){
        queryResults = getFruitListResult.filter(
            singleFruitInfo => singleFruitInfo.name === name && singleFruitInfo.quantity > quantityMoreThan);
    }
    if (quantityLessThan && quantityMoreThan){
        queryResults = getFruitListResult.filter(singleFruitInfo => singleFruitInfo.quantity > quantityMoreThan && 
            singleFruitInfo.quantity < quantityLessThan);
    }
    if (name && quantityLessThan && quantityMoreThan){
        queryResults = getFruitListResult.filter(
            singleFruitInfo => singleFruitInfo.name === name && 
            singleFruitInfo.quantity > quantityMoreThan && 
            singleFruitInfo.quantity < quantityLessThan);
    }
    return{
        queryResults,
    }
};


function create(newFruit){
    fs.readFile(readFruitList, function(err, data){
        if(err){
            return console.error(err);
        }
        const stringOfFruitList = data.toString();                          //將二進位制的資料轉換為字串
        const fruitList = JSON.parse(stringOfFruitList);                    //將字串轉換為json物件
        fruitList.push(newFruit);                                           //將req.body push進陣列物件中
        const stringOfCreateNewFruit = JSON.stringify(fruitList,"","\t");    //json物件轉換成字串重新寫入json檔案中,加上(“”,“\t")來排列整齊
        fs.writeFile(readFruitList, stringOfCreateNewFruit,function(err){    //寫入
            if(err){
                console.log(err);
            }
        });
    })
}


function remove(deleteFruitId){
    fs.readFile(readFruitList, function(err, data){
        if(err){
            return console.error(err);
        }
        const stringOfFruitList = data.toString();
        const fruitList = JSON.parse(stringOfFruitList);
        //把資料讀出來刪除
        for(var i = 0; i < fruitList.length;i++){
            if(deleteFruitId == fruitList[i].id){
                //console.log(person.data[i])
                fruitList.splice(i,1);
            }
        }
        const stringOfDeletedFruitList = JSON.stringify(fruitList,"","\t");
        //然後再把資料寫進去
        fs.writeFile(readFruitList, stringOfDeletedFruitList, function(err){
            if(err){
                console.error(err);
            };
        })
    })
}

module.exports = {
    getResult,
    create,
    remove
  }