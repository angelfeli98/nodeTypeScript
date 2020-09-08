"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./database/db"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const hospital_1 = __importDefault(require("./routes/hospital"));
const doctor_1 = __importDefault(require("./routes/doctor"));
const search_1 = __importDefault(require("./routes/search"));
const file_1 = __importDefault(require("./routes/file"));
class Server {
    constructor() {
        this.configServer = () => {
            this.makeConnectionToDB();
            this.server.use(cors_1.default());
            this.server.use(body_parser_1.default.urlencoded({ extended: false }));
            this.server.use(body_parser_1.default.json());
            this.server.use(express_fileupload_1.default());
            this.server.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
            this.server.use('/user', this.api_users);
            this.server.use('/auth', this.api_auth);
            this.server.use('/hospital', this.api_hospital);
            this.server.use('/doctor', this.api_doctor);
            this.server.use('/search', this.api_search);
            this.server.use('/file', this.api_file);
        };
        this.makeConnectionToDB = () => {
            const connection = new db_1.default();
        };
        this.initServer = () => {
            this.server.listen(this.port, () => {
                console.log(`Server ready at http://localhost:${this.port}`);
            });
        };
        this.port = process.env.PORT;
        this.server = express_1.default();
        this.api_users = user_1.default;
        this.api_auth = auth_1.default;
        this.api_doctor = doctor_1.default;
        this.api_hospital = hospital_1.default;
        this.api_search = search_1.default;
        this.api_file = file_1.default;
        this.configServer();
        this.initServer();
    }
}
exports.Server = Server;
