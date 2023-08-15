"use strict";
// Step 1 - import mongoose - database adapter
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Step 2 - Create a Schema that matches the data in the collection
var RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    }
});
// Step 3- Create a Model using the Schema
var Model = mongoose_1.default.model("Roles", RoleSchema);
//module.exports = mongoose.model("Role", RoleSchema);
// Step 4 - Export the Model -> converts this file into a module
exports.default = Model;
