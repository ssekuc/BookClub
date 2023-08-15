import express from 'express';

// require passport functionality
import passport from 'passport';

// require User Model
import User from '../models/user';

import { UserDisplayName } from '../utils';

/* Display Functions */
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    if(!req.user)
    {
        return res.render('index', {title: "Login", page: "login", messages: req.flash("loginMessage"), displayName: UserDisplayName(req)});
    }
    return res.redirect('/index');
}

/* Display Functions */
export function DisplayUserPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    if(req.user)
    {
        
        return res.render('index', {title: "Login", page: "user-profile", userInfo:req.user, messages: req.flash("loginMessage"), displayName: UserDisplayName(req)});
            
    }
   // return res.redirect('/user-profile');
}

export function DisplayRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    if(!req.user)
    {
        return res.render('index', {title: "Register", page: "register", messages: req.flash("registerMessage"), displayName:  UserDisplayName(req)});
    }
    return res.redirect('/books');
}

/* Processing Functions */
export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    passport.authenticate('local', function(err:any, user:any, info:any)
    {
        // are there server errors?
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // are there login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/login');
        }

        // no problems - we have a good username and password combination
        req.logIn(user, function(err)
        {
            // are there db errors?
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            return res.redirect('/');

                // if (user.role == "reader"){
                //     return res.redirect('/');
                // }
                // } else {
                //     return res.redirect('/administrator');
                // }
           
        });
    })(req, res, next);
}

export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    // Instantiate a new User
    let newUser = new User
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName,
        role: "reader"
    });

    // Add the New User to the Database
    User.register(newUser, req.body.password, function(err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error!');
            }
            else
            {
                console.error(err.name); // other error
                req.flash('registerMessage', 'Server Error');
            }
            return res.redirect('/register');
        }

        // if everything is ok - user has been registered

        // automatically login the user
        return passport.authenticate('local')(req, res, function()
        {
            return res.redirect('/books');
        });
    });
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    req.logOut(function(err)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log('User Logged Out');
    });

    res.redirect('/login');
}