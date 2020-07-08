
import mysql = require('mysql')

export default class DataBase{

    private static database : DataBase;

    private host: string;
    private user: string;
    private password: string;
    private db: string;
    private connection : mysql.Connection;

    constructor(){
        this.host = 'localhost';
        this.user = 'feli';
        this.password = 'feli';
        this.db = 'restaurant';
        this.connection = this.makeConnection();

        if(!!!DataBase.database){
            this.connection.connect((err : mysql.MysqlError) => {
                if(!!!err) console.log('Database connection ready');
                else console.log(err);
            });
            DataBase.database = this
            return this;
        }
        else
            return DataBase.database;
    }

    private makeConnection(){
        return mysql.createConnection({
            host : this.host,
            user : this.user,
            password : this.password,
            database : this.db
        })
    }

    public async makeQuery(query : string, data : Object, callback : Function){
        DataBase.database.connection.query(query, data, (err, results : Object, fields) => {
            if(err)
                callback(true, null, null);
            else
                callback(false, results, fields);

        });
    }
}