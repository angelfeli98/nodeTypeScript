"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DataBase {
    constructor() {
        this.makeConnection = async () => {
            try {
                await mongoose_1.default.connect(this.url, this.options);
                console.log('Database connection ready');
            }
            catch (error) {
                console.log(error);
            }
        };
        this.url = process.env.URL_DB;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
        this.makeConnection();
    }
}
exports.default = DataBase;
