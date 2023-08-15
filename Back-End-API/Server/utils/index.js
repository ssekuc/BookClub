"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    if (req.user) {
        var user = req.user; // Assuming req.user has a displayName property
        return user.displayName;
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
