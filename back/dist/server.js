"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
require("./db");
var employees_1 = __importDefault(require("./routes/employees"));
var users_1 = __importDefault(require("./routes/users"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/employees', employees_1.default);
app.use('/users', users_1.default);
app.listen(3001, function () { return console.log('started on http://localhost:3001/'); });
