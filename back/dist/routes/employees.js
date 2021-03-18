"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.json({ emplyees: 'all' });
});
router.post('/', function (req, res) {
    res.json({ added: true });
});
router.put('/', function (req, res) {
    res.json({ updated: true });
});
router.delete('/', function (req, res) {
    res.json({ deleted: true });
});
exports.default = router;
