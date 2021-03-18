"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://root:1234@127.0.0.1:27018/', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (err)
        throw err;
    console.log('Connected to mongoDB');
});
exports.default = mongoose_1.default;
