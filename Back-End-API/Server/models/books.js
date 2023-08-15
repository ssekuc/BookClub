"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BookSchema = new mongoose_1.Schema({
    Name: { type: String, require: true },
    Author: { type: String, require: true },
    Sipnosis: { type: String, require: true },
    Year: { type: String, require: true },
    TotalPages: { type: String, require: true },
    Edition: { type: String, require: true },
    Publisher: { type: String, require: true },
    cover: { type: String, require: true },
});
var Model = mongoose_1.default.model("Books", BookSchema);
exports.default = Model;
