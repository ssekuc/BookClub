"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var passportLocal = require("passport-local");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var path = require("path");
var cors = require("cors");
var passportJWT = require("passport-jwt");
var logger = require("morgan");
var createError = require("http-errors");
var flash = require("connect-flash");
var user_1 = require("../models/user");
var index_1 = require("../Routes/index");
var auth_route_server_1 = require("../Routes/auth.route.server");
var books_1 = require("../Routes/books");
var db_1 = require("./db"); // Update path as required
mongoose.connect(db_1.RemoteURI);
var db = mongoose.connection;
db.on('open', function () { return console.log("Connected to MongoDB"); });
db.on('error', function () { return console.error('Connection Error'); });
var app = express();
var Port = 3001;
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: db_1.Secret,
    saveUninitialized: false,
    resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = passportLocal.Strategy;
passport.use(user_1.default.createStrategy());
passport.serializeUser(user_1.default.serializeUser());
passport.deserializeUser(user_1.default.deserializeUser());
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
var jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: db_1.Secret
};
var strategy = new JWTStrategy(jwtOptions, function (jwt_payload, done) {
    user_1.default.findById(jwt_payload.id)
        .then(function (user) {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false); // Return false if the user is not found
        }
    })
        .catch(function (err) {
        return done(err, false);
    });
});
passport.use(strategy);
app.use('/', index_1.default);
app.use('/', auth_route_server_1.default);
app.use('/', books_1.default);
app.use(function (req, res, next) { next(createError(404)); });
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
app.listen(Port, function () {
    console.log("Localhost:3000 app listening on port ".concat(Port));
});
exports.default = app;
