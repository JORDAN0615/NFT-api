import { query } from "express";
import config from "./dbconfig_mysqlForTS";
const mysql = require("mysql");
const express = require("express");
const res = require("express/lib/response");
const promiseMysql = require("promise-mysql");
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface fruitResultsType{
  id: number;
  name: string;
  quantity: number;
}
interface queryOption{
  name: string;
  quantityMoreThan: number;
  quantityLessThan: number;
  id: number;
}
interface addFruitTypes{
  recordset: object;
  name: string;
  quantity: number;
}

type furitTypeForFindUnique = {
  name: string;
  id: number;
  quantity: number;
};

async function getFruitListResult(query: queryOption) {
  let fruitResult = await prisma.fruitlist.findMany()
  const { name, quantityMoreThan, quantityLessThan, id } = query;

  if (name) {
    const name = query.name;
    let fruitResult = await prisma.fruitlist.findUnique({
     where: {
       name: String(name),
     },
    })
  return fruitResult;
  }
//query(id) function works
  if (id) {
    const id = query.id;
    let fruitResult = await prisma.fruitlist.findUnique({
      where: {
        id: Number(id),
      },
    })
    return fruitResult;
  }

  if (quantityLessThan) {
    const quantityLessThan = query.quantityLessThan
    let fruitResult = await prisma.fruitlist.findMany({
    where: {
      quantity:{
        lte: Number(quantityLessThan)
      }
    }
    })
    return fruitResult;
  }
  if (quantityMoreThan) {
    const quantityMoreThan = query.quantityMoreThan
    let fruitResult = await prisma.fruitlist.findMany({
      where: {
        quantity:{
          gte: Number(quantityMoreThan)
        }
      }
    })
    return fruitResult
  }
   return fruitResult;
 }

// async function getFruitListResult(query: queryOption) {
//   const { name, quantityMoreThan, quantityLessThan, id } = query;
//   let pool = await promiseMysql.createPool(config);
//   const connection = await pool.getConnection();
//   let fruitResult: fruitResultsType;

//   const sql = "SELECT * FROM `fruitlist`";
//   fruitResult = await connection.query(sql);

//   if (name) {
//     fruitResult = await connection.query(
//       "SELECT * FROM fruitlist WHERE name = ? ",
//       [name]
//     );
//   }
//   if (id) {
//     fruitResult = await connection.query(
//       "SELECT * FROM fruitlist WHERE id = ? ",
//       [id]
//     );
//   }
//   if (quantityLessThan) {
//     fruitResult = await connection.query(
//       "SELECT * FROM fruitlist WHERE quantity < ? ",
//       [quantityLessThan]
//     );
//   }
//   if (quantityMoreThan) {
//     fruitResult = await connection.query(
//       "SELECT * FROM fruitlist WHERE quantity > ? ",
//       [quantityMoreThan]
//     );
//   }
//   return fruitResult;
// }

//new code using prisma and postgre
//post function works!!
async function addFruitItem(fruit: addFruitTypes) {
  try {
    await prisma.fruitlist.create({
      data: {
        name: fruit.name,
        quantity: fruit.quantity
      },
    })
  } catch (err) {
    console.log(err);
  }
}

// old addFruit code using promise mysql 
// async function addFruitItem(fruit: addFruitTypes) {
//   try {
//     let pool = await mysql.createConnection(config);
//     let addFruit: addFruitTypes = await pool
//       // .input('name', sql.NVarChar(50), fruit.name)
//       // .input('quantity', sql.Int, fruit.quantity)
//       .query(
//         "insert into fruitlist (name, quantity) values (${name}, ${quantity})"
//       );
//     return addFruit.recordset;
//   } catch (err) {
//     console.log(err);
//   }
// }

//delete function works!
async function deleteFruit(fruitId: any) {
  try {
    const id = fruitId;
    const deleteFruit = await prisma.fruitlist.delete({
      where: { 
        id: Number(id) },
    })
    return deleteFruit;
  } catch (err) {
    console.log(err);
  }
}

// async function deleteFruit(fruitId: string) {
//   try {
//     let pool = await mysql.createConnection(config);
//     // let deleteFruit = await
//     pool.query("delete from  `fruitlist` WHERE `id` = ?", [fruitId], function(
//       _error: string,
//       ) {
//       console.log("deleted successfully");
//     });

//     return deleteFruit;
//   } catch (err) {
//     console.log(err);
//   }
// }
export {getFruitListResult, addFruitItem, deleteFruit};
