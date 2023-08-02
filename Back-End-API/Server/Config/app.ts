import createError from 'http-errors';
import express, { NextFunction, Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


// import the database connector / adapter package
import mongoose from 'mongoose';

// Step 1 for auth - import modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';
import connect from 'connect';

// modules for JWT support
import cors from 'cors'; // Cross-Origin Resource Sharing

// Step 2 for auth - define our auth objects
//let localStrategy = passportLocal.Strategy; // alias

// Step 3 for auth - import the User Model


// import router data from the router module(s)
import indexRouter from '../Routes/index'; 
import authRouter from '../Routes/auth.route.server'




// create the application object - which is of type express
const app = express();




// Complete the DB Connection Configuration

import * as DBConfig from './db'

mongoose.connect(DBConfig.RemoteURI);
const db = mongoose.connection; // alias for the mongoose connection

// Listen for Connections or Errors
db.on("open", function()
{
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});

db.on("error", function()
{
  console.error(`Connection Error`);
});






// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors()); // adds CORS middleware

// Step 4 for auth - setup express session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}));



// Step 5 for auth - setup Connect Flash
app.use(flash());

// Step 6 for auth - initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Step 7 for auth - implement the auth strategy
//passport.use(User.createStrategy());

// Step 8 for auth - setup User serialization and deserialization (encoding / decoding)
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

// add routing 
app.use('/', indexRouter);
app.use('/', authRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



export default app;




