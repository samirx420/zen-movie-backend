import { Router, NextFunction, Response, Request } from "express";

// MODELS
import User from "../user/domain/User";

// UTILITIES
import Utilities from "../../utilities/utli";
import { upload } from "../../utilities/fileupload";

// USE-CASES
import { 
    list_movie
    , movie_detail
    , create_movie
    , update_movie
    , delete_movie
 } from "./use-case";

export class MovieController {

    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public async get_all(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let user_decoded: User = req['user']?.data;
            let response = await list_movie(user_decoded, +req.query.page, +req.query.limit, req.query.search as string);

            return res.status(200).json(response);

        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }

    }

    public async get_by_id(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id       = req.params.id;
            let user_decoded: User = req['user']?.data;
            let response = await movie_detail(user_decoded, id);

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let payload            = req.body;
            let user_decoded: User = req['user'].data;
            let poster_path        = (req.files['poster'] != undefined) ? req.files['poster'][0].filename : '' as string;
                payload            = {...payload, created_by:user_decoded.id, poster_path: poster_path};
            let response           = await create_movie(payload);

            delete payload.poster;

            return res.status(201).json(response);
        } catch (error) {
            console.log(error.message);
            next({ status: 400, message: error.message });
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id          = req.params.id;
            let payload     = req.body;
            let poster_path = (req.files['poster'] != undefined) ? req.files['poster'][0].filename : '' as string;
                payload     = {...payload, poster_path: poster_path};
        

            let response    = await update_movie(id, payload);

            delete payload.poster;
            
            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }
    
    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id              = req.params.id;
            let response = await delete_movie(id);

            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public initRoutes() {
        this.router.get('/'         , Utilities.check_auth_allowable, this.get_all);
        this.router.get('/:id'      , Utilities.check_auth_allowable, this.get_by_id);
        this.router.post('/'        , upload.fields([{ name: 'poster', maxCount: 1 }]), Utilities.check_auth, this.create);
        this.router.put('/:id'      , upload.fields([{ name: 'poster', maxCount: 1 }]), Utilities.check_auth, this.update);
        this.router.delete('/:id'   , Utilities.check_auth,this.delete);
    }

}
export default new MovieController().router;
