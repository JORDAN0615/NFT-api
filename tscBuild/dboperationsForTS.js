"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFruit = exports.addFruitItem = exports.getFruitListResult = void 0;
const dbconfig_mysqlForTS_1 = __importDefault(require("./dbconfig_mysqlForTS"));
const mysql = require("mysql");
const express = require("express");
const res = require("express/lib/response");
const { isEmpty } = require("lodash");
const { nextTick } = require("async");
const { ReturnValueToken } = require("tedious/lib/token/token");
const promiseMysql = require("promise-mysql");
function getFruitListResult(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, quantityMoreThan, quantityLessThan, id } = query;
        let pool = yield promiseMysql.createPool(dbconfig_mysqlForTS_1.default);
        const connection = yield pool.getConnection();
        let fruitResult;
        const sql = "SELECT * FROM `fruitlist`";
        fruitResult = yield connection.query(sql);
        if (name) {
            fruitResult = yield connection.query("SELECT * FROM fruitlist WHERE name = ? ", [name]);
        }
        if (id) {
            fruitResult = yield connection.query("SELECT * FROM fruitlist WHERE id = ? ", [id]);
        }
        if (quantityLessThan) {
            fruitResult = yield connection.query("SELECT * FROM fruitlist WHERE quantity < ? ", [quantityLessThan]);
        }
        if (quantityMoreThan) {
            fruitResult = yield connection.query("SELECT * FROM fruitlist WHERE quantity > ? ", [quantityMoreThan]);
        }
        return fruitResult;
    });
}
exports.getFruitListResult = getFruitListResult;
function addFruitItem(fruit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pool = yield mysql.createConnection(dbconfig_mysqlForTS_1.default);
            let addFruit = yield pool
                // .input('name', sql.NVarChar(50), fruit.name)
                // .input('quantity', sql.Int, fruit.quantity)
                .query("insert into fruitlist (name, quantity) values (${name}, ${quantity})");
            return addFruit.recordset;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.addFruitItem = addFruitItem;
function deleteFruit(fruitId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pool = yield mysql.createConnection(dbconfig_mysqlForTS_1.default);
            // let deleteFruit = await
            pool.query("delete from  `fruitlist` WHERE `id` = ?", [fruitId], function (_error) {
                console.log("deleted successfully");
            });
            return deleteFruit;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.deleteFruit = deleteFruit;
