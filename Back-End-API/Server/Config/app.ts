
import express = require("express");
import mongoose = require("mongoose");
import passport = require('passport');
import passportLocal = require('passport-local');
import session = require('express-session');
import cookieParser = require('cookie-parser');
import path = require('path');
import cors = require('cors');
import passportJWT = require('passport-jwt');
import logger = require('morgan');
import createError = require('http-errors');
import flash = require('connect-flash');


import User from '../models/user';
import indexRouter from '../Routes/index';
import authRouter from '../Routes/auth.route.server';
import booksRouter from '../Routes/books';
import { Secret, RemoteURI } from './db'; // Update path as required

mongoose.connect(RemoteURI);
const db = mongoose.connection;
db.on('open', () => console.log(`Connected to MongoDB`));
db.on('error', () => console.error('Connection Error'));

const app = express();
const Port = 3001;

app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use(session({
  secret: Secret,
  saveUninitialized: false,
  resave: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = passportLocal.Strategy;
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: Secret
};

let strategy = new JWTStrategy(jwtOptions, (jwt_payload: any, done: any) => {
  User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false); // Return false if the user is not found
        }
      })
      .catch(err => {
        return done(err, false);
      });
});


passport.use(strategy);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', booksRouter);

app.use((req, res, next) => { next(createError(404)); });

app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(Port, () => {
  console.log(`Localhost:3000 app listening on port ${Port}`);
});

export default app;
