const config  = require('./dbconfig')
const sql = require('mssql')
const { doUntil } = require('async');
const { isEmpty } = require('lodash');

//name quantitymorethan 失敗
async function getFruitListResult(query) {
    const { name, quantityMoreThan, quantityLessThan ,Id} = query;
    try {
    let pool = await sql.connect(config)
    if (isEmpty){
        let result = await pool.request()
            .query('select * from fruitlists')
            return result.recordset
    }
    if (name){
        let fruitResult = await pool.request()
            .input('name', sql.NVarChar, name)
            .query("select * from fruitlists where name = @name");
        return fruitResult.recordset
     }
     if (Id){
        let fruitResult = await pool.request()
            .input('Id', sql.Int, Id)
            .query("select * from fruitlists where Id = @Id");
        return fruitResult.recordset
     }
     if (quantityLessThan){
         let fruitResult = await pool.request()
            .input('quantityLessThan', sql.Int, quantityLessThan)
            .query("select * from fruitlists where quantity < @quantityLessThan");
        return fruitResult.recordset
     }
     if (quantityMoreThan){
        let result = await pool.request()
            .input('quantityMoreThan', sql.Int, quantityMoreThan)
            .query("select * from fruitlists where quantity > @quantityMoreThan");
        return result.recordset
     }
    
    }catch(error){
        console.log(error);
    }
}



async function getFruitListResultFromId(fruitId){
    try{
        let pool = await sql.connect(config)
        let fruit = await pool.request()
            .input('input_parameter', sql.Int, fruitId)
            .query("select * from fruitlists where Id = @input_parameter");
        return fruit.recordset
    }catch(error){
        console.log(error);
    }
}
//新增水果失敗 -- 無法讀到postman上的req.body
async function addFruitItem(fruit){
    try{
        let pool = await sql.connect(config)
        let addFruit = await pool.request()
            .input('name', sql.NVarChar(50), fruit.name)
            .input('quantity', sql.Int, fruit.quantity)
            .query('insert into fruitlists (name, quantity) values (@name, @quantity)')
            return addFruit.recordset;
    }catch(err){
        console.log(err);   
    }
}

async function deleteFruit(fruitId){
    try{
        let pool = await sql.connect(config)
        let deleteFruit = await pool.request()
            .input('input_parameter', sql.Int, fruitId)
            .query("delete from fruitlists where Id = @input_parameter")
            return deleteFruit.recordset;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getFruitListResult : getFruitListResult,
    getFruitListResultFromId : getFruitListResultFromId,
    addFruitItem: addFruitItem,
    deleteFruit: deleteFruit
}
