import { Router, NextFunction, Response, Request } from "express";

// MODELS
import User from "../user/domain/User";

// UTILITIES
import Utilities from "../../utilities/utli";

// USE-CASES
import {
    get_my_watchlist
    , add_to_watchlist
    , remove_from_watchlist
} from "./use-case";

export class WatchlistController {

    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public async get_all(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let user_decoded: User = req['user'].data;
            let response           = await get_my_watchlist(user_decoded.id, +req.query.page, +req.query.limit);

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
                payload            = { ...payload, created_by: user_decoded.id };
            let response           = await add_to_watchlist(payload);

            return res.status(201).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let movie_id = req.params.movieId;
            let response = await remove_from_watchlist(movie_id);

            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public initRoutes() {
        this.router.get('/'             , Utilities.check_auth_allowable, this.get_all);
        this.router.post('/'            , Utilities.check_auth, this.create);
        this.router.delete('/:movieId'  , Utilities.check_auth, this.delete);
    }

}
export default new WatchlistController().router;
