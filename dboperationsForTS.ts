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
  let fruitResult = await prisma.fruitlist;
  
  const { name, quantityMoreThan, quantityLessThan, id } = query;

  if (name) {
    const name = query.name;
    return fruitResult.findUnique({
     where: {
       name: String(name),
     },
    })
  }
//query(id) function works
  if (id) {
    const id = query.id;
    return fruitResult.findUnique({
      where: {
        id: Number(id),
      },
    })
  }

  if (quantityLessThan) {
    const quantityLessThan = query.quantityLessThan
    return fruitResult.findMany({
    where: {
      quantity:{
        lte: Number(quantityLessThan)
      }
    }
    })
  }
  if (quantityMoreThan) {
    const quantityMoreThan = query.quantityMoreThan
    return fruitResult.findMany({
      where: {
        quantity:{
          gte: Number(quantityMoreThan)
        }
      }
    })
  }
   return fruitResult.findMany();
 }
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

export {getFruitListResult, addFruitItem, deleteFruit};
