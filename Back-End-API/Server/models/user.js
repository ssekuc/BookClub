"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user.ts
var mongoose_1 = require("mongoose");
// @ts-ignore
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new mongoose_1.Schema({
    displayName: String,
    username: String,
    emailAddress: String,
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Roles', required: true }
}, {
    timestamps: true,
});
UserSchema.plugin(passportLocalMongoose);
var User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
