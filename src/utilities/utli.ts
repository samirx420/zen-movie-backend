import * as _       from "lodash";
import * as bcrypt  from 'bcryptjs';
import * as jwt     from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";

export class Utilities {

    async is_password_valid(password: string, password_digest: string) {
        return bcrypt.compare(password, password_digest)
    }

    async encode_jwt(payload: any) {
        return jwt.sign({
            exp : Math.floor(Date.now() / 1000) + (60 * 60),
            data: payload
        }, 'secret')
    }

    async hash(password: string) {
        let saltRounds = 10;

        return bcrypt.hash(password, saltRounds);
    }

    async check_auth_allowable(_req: Request, _res: Response, _next: NextFunction) {
        const header = _req.headers.authorization as string;

        if (!header) {
            console.log('no header')
            return _next();
        }
        try {
            const token   = header.split(" ")[1];
            const payload = await jwt.verify(token, 'secret');
            _req ["user"] = payload;
            return _next()
        }
        catch (err) {
            console.log(err.message)
            return _next();
        }
    }
    
    async check_auth(_req: Request, _res: Response, _next: NextFunction) {
        const header = _req.headers.authorization as string;

        if (!header) {
            console.log('no header')
            return _next({ status: 400, message: "unauthorized" });
        }
        try {
            const token   = header.split(" ")[1];
            const payload = await jwt.verify(token, 'secret');
            _req ["user"] = payload;
            return _next()
        }
        catch (err) {
            console.log(err.message)
            return _next();
        }
    }

    async check_role(permitted_single_role: string, _req: Request, _res: Response, _next: NextFunction) {
        const payload = _req['user'];
        if (permitted_single_role.localeCompare(payload.data.role.role) !== 0) {
            console.log(payload)
            console.log('no permission')
            return _next({ status: 400, message: "unauthorized" });
        }

        _next();
    }

    public not_found(req: Request, res: Response, next: NextFunction) {        
        res.status(404).json({
            error: "not found"
        })
    }

    public global_system_error_handler(error: {status:number,message:string}, req: Request, res: Response, next: NextFunction) {
        res.status(error.status);        
        res.json({
            error: {
                message: error.message || "Oops! Something went wrong."
            }
        });
    }

}

export default new Utilities();
