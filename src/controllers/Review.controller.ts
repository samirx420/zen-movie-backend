import { Router, NextFunction, Response, Request } from "express";

// MODELS
import Movie from "../model/Movie";
import User from "../model/User";

// SERVICES
import ReviewService from "../services/Review.service";

// UTILITIES
import Utilities from "../utilities/utli";

export class ReviewController {

    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    /**
     * Get all reviews by movie id
     * @param req 
     * @param res 
     * @param next 
     */
    public async get_By_movie(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let movieId = +req.params.movieId;
            let page = +req.query.page;
            let limit = +req.query.limit;

            let response = await ReviewService.get_review_by_movie(movieId, page, limit);

            return res.status(200).json(response);

        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }

    }

    /**
     * Create a review
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let payload            = req.body;
            let user_decoded: User = req['user'].data;
                payload            = {...payload, created_by:user_decoded.id};
            let response           = await ReviewService.create_review(payload);

            return res.status(201).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    /**
     * Update a review
     * @param req 
     * @param res 
     * @param next 
     */
    public async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let id                 = +req.params.reviewId;
            let payload            = req.body;
            let user_decoded: User = req['user'].data;
                payload            = {...payload, created_by:user_decoded.id};
            let response           = await ReviewService.update_review(id, payload);

            return res.status(201).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    /**
     * Delete a review
     * @param req 
     * @param res 
     * @param next 
     */
    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let review_id              = req.params.reviewId;
            let response = await ReviewService.delete(review_id);

            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public initRoutes() {
        this.router.get('/:movieId'         , this.get_By_movie);
        this.router.post('/'                , Utilities.check_auth, this.create);
        this.router.put('/:reviewId'        , Utilities.check_auth, this.update);
        this.router.delete('/:reviewId'     , Utilities.check_auth,this.delete);
    }

}
export default new ReviewController().router;
