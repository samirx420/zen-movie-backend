import { Router, NextFunction, Response, Request } from "express";

// MODELS
import Movie from "../model/Movie";
import User from "../model/User";

// SERVICES
import MovieService from "../services/Movie.service";

// UTILITIES
import Utilities from "../utilities/utli";

export class MovieController {

    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public async get_all(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let user_decoded: User = req['user'].data;
            let response = await MovieService.get_all(user_decoded, req.query.page as string, req.query.limit as string);

            return res.status(200).json(response);

        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }

    }

    public async get_by_id(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id       = req.params.id;
            let response = await MovieService.get_by_id(id);

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
                payload            = {...payload, created_by:user_decoded.id};
            let response           = await MovieService.create(payload);

            return res.status(201).json(response);
        } catch (error) {
            console.log(error.message);
            next({ status: 400, message: error.message });
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id              = req.params.id;
            let payload: Movie = req.body;

            let response = await MovieService.update(id, payload);

            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }
    
    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id              = req.params.id;
            let response = await MovieService.delete(id);

            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public initRoutes() {
        this.router.get('/'         , Utilities.check_auth_allowable, this.get_all);
        this.router.get('/:id'      , Utilities.check_auth_allowable, this.get_by_id);
        this.router.post('/'        , Utilities.check_auth, this.create);
        this.router.put('/:id'      , Utilities.check_auth, this.update);
        this.router.delete('/:id'   , Utilities.check_auth,this.delete);
    }

}
export default new MovieController().router;
