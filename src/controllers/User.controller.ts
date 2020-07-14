import { Router, NextFunction, Response, Request } from "express";

// SERVICES
import UserService from '../services/User.service';

// MODELS
import User from "../model/User";

// UTILITIES
import Utilities from "../utilities/utli";
import { upload } from "../utilities/fileupload";

export class UserController {

    router: Router;

    constructor() {

        this.router = Router();
        this.initRoutes();

    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            let user: User = req.body;
            let response = await UserService.login(user)

            return res.status(200).json(response);
        } catch (error) {
            return next({ status: 404, message: error.message })
        }

    }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            let avatar     = (req.files['avatar'] != undefined) ? req.files['avatar'][0].filename : '' as string;
            let user: User = {...req.body, avatar: avatar};
            
            let response = await UserService.register(user);

            return res.status(201).json(response);

        } catch (error) {
            console.log('error_message',error.message)
            return next({ status: 404, message: error.message });
        }
    }

    public async my_profile(req: Request, res: Response, next: NextFunction) {
        try {

            let user_decoded: User = req['user'].data;
            let response = await UserService.my_profile(user_decoded);

            return res.status(200).json(response);

        } catch (error) {
            console.log(error.message)
            return next({ status: 404, message: error.message });
        }
    }

    public async my_profile_update(req: Request, res: Response, next: NextFunction) {
        try {

            let avatar     = (req.files['avatar'] != undefined) ? req.files['avatar'][0].filename : '' as string;
            let user: User = {...req.body, avatar: avatar};

            let user_decoded: User = req['user'].data;

            let response = await UserService.my_profile_update(user, user_decoded)

            return res.status(201).json({ message: 'user updated' });

        } catch (error) {
            console.log(error)
            return next({ status: 404, message: error.message });
        }
    }

    initRoutes() {
        this.router.post('/login'   , this.login);
        this.router.post('/register', upload.fields([{ name: 'avatar', maxCount: 1 }]), this.register);
        this.router.get('/me'       , Utilities.check_auth, this.my_profile);
        this.router.put('/me'       , Utilities.check_auth, upload.fields([{ name: 'avatar', maxCount: 1 }]), this.my_profile_update);
    }

}

export default new UserController().router;