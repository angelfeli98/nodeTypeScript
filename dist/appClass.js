"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
class Server {
    constructor(port) {
        this.app = express();
        this.port = port;
        if (!!!Server.server) {
            Server.server = this;
            return this;
        }
        else
            return Server.server;
    }
    useServer() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use(cors());
    }
    runServer(callback) {
        this.app.listen(this.port, callback());
    }
    getPort() {
        return this.port;
    }
}
exports.default = Server;
