import express = require("express");
import { Request, Response, NextFunction } from "express";
import passport = require("passport");
import User, { IUser } from "../models/user";
import { UserDisplayName } from "../utils/index";


function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Home', page: 'home' });
}

export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if(!req.user) {
        return res.render('index', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)})
    }

    return res.redirect('/')
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void {
    if(!req.user) {
        return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)})
    }

    return res.redirect('/')
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', function(err: any, user: any, info: any) {
        if(err) {
            console.error(err);
            res.end(err);
        }

        if(!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.logIn(user, function(err: any) {
            if(err) {
                console.error(err);
                res.end(err);
            }
            return res.redirect('/');
        })
    })(req, res, next);
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void {
    // We don't know the exact type of your user model, so we will just use 'any' for now


    let newUser: IUser = new User({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName,
        role: "64dace419da525abbab2c3ae"
    });

    User.register(newUser, req.body.password, function(err: any) {
        if(err){
            if(err.name == "UserExistsError"){
                console.error('ERROR : User Already Exists!');
                req.flash('registerMessage', 'Registration Error')
            } else {
                console.error(err);
                req.flash('registerMessage', 'Server Error')
            }

            // return res.redirect('/register');
        }

        return passport.authenticate('local')(req, res, function() {
            return res.redirect('/');
        });
    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void {
    req.logOut(function(err: any){
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log("user logged out successfully");
    });

    res.redirect('/login');
}
