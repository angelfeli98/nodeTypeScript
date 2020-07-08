"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class DataBase {
    constructor() {
        this.host = 'localhost';
        this.user = 'feli';
        this.password = 'feli';
        this.db = 'restaurant';
        this.connection = this.makeConnection();
        if (!!!DataBase.database) {
            this.connection.connect((err) => {
                if (!!!err)
                    console.log('Database connection ready');
                else
                    console.log(err);
            });
            DataBase.database = this;
            return this;
        }
        else
            return DataBase.database;
    }

    makeConnection() {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.db
        });
    }

    async makeQuery(query, data, callback) {
        DataBase.database.connection.query(query, data, (err, results, fields) => {
            if (err)
                callback(true, null, null);
            else
                callback(false, results, fields);
        });
    }
}
exports.default = DataBase;
