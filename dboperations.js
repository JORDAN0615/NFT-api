const config = require("./dbconfig_mysql");
const mysql = require("mysql");
const express = require("express");
const res = require("express/lib/response");
const { isEmpty } = require("lodash");
const { nextTick } = require("async");
const { ReturnValueToken } = require("tedious/lib/token/token");
const promiseMysql = require("promise-mysql");
//name quantitymorethan 失敗
async function getFruitListResult(query) {
  const { name, quantityMoreThan, quantityLessThan, id } = query;
  let pool = await promiseMysql.createPool(config);
  const connection = await pool.getConnection();
  let fruitResult;

  const sql = "SELECT * FROM `fruitlist`";
  fruitResult = await connection.query(sql);

  if (name) {
    fruitResult = await connection.query(
      "SELECT * FROM fruitlist WHERE name = ? ",
      [name]
    );
  }
  if (id) {
    fruitResult = await connection.query(
      "SELECT * FROM fruitlist WHERE id = ? ",
      [id]
    );
  }
  if (quantityLessThan) {
    fruitResult = await connection.query(
      "SELECT * FROM fruitlist WHERE quantity < ? ",
      [quantityLessThan]
    );
  }
  if (quantityMoreThan) {
    fruitResult = await connection.query(
      "SELECT * FROM fruitlist WHERE quantity > ? ",
      [quantityMoreThan]
    );
  }
  return fruitResult;
}

//新增水果失敗 -- 無法讀到postman上的req.body
async function addFruitItem(fruit) {
  try {
    let pool = await mysql.createConnection(config);
    let addFruit = await pool
      // .input('name', sql.NVarChar(50), fruit.name)
      // .input('quantity', sql.Int, fruit.quantity)
      .query(
        "insert into fruitlist (name, quantity) values (${name}, ${quantity})"
      );
    return addFruit.recordset;
  } catch (err) {
    console.log(err);
  }
}

async function deleteFruit(fruitId) {
  try {
    let pool = await mysql.createConnection(config);
    // let deleteFruit = await
    pool.query("delete from  `fruitlist` WHERE `id` = ?", [fruitId], function(
      error,
      result
    ) {
      console.log("deleted successfully");
    });

    return deleteFruit.recordset;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getFruitListResult: getFruitListResult,
  addFruitItem: addFruitItem,
  deleteFruit: deleteFruit
};
