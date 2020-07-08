"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const user_1 = require("./router/user");
class Server {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.api = user_1.router;
        if (!!!Server.server) {
            Server.server = this;
            this.useServer();
            return this;
        }
        else
            return Server.server;
    }
    useServer() {
        this.app.use(express.static(path.resolve(__dirname, 'public')));
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use('/user', this.api);
    }
    runServer(callback) {
        this.app.listen(this.port, callback());
    }
    getPort() {
        return this.port;
    }
}
exports.default = Server;
