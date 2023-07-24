import { Request, Response, NextFunction } from 'express';

export function UserDisplayName(req: Request): string {
    if(req.user){
        let user = req.user as { displayName: string }; // Assuming req.user has a displayName property
        return user.displayName;
    }
    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void | Response {
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}
