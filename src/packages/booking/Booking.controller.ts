import { Router, NextFunction, Response, Request } from "express";

// MODELS
import User from "../user/domain/User";

// UTILITIES
import Utilities from "../../utilities/utli";

import {
    create_booking
    , booking_history
    , booked_seats
} from "./use-case";

export class BookingController {

    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    /**
     * Book a movie
     * @param req 
     * @param res 
     * @param next 
     */
    public async book(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let payload            = req.body;
            let user_decoded: User = req['user'].data;
                payload            = { ...payload, created_by: user_decoded.id };
            let response           = await create_booking(payload);

            return res.status(201).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }
  
    /**
     * My booking history
     * @param req 
     * @param res 
     * @param next 
     */
    public async booking_history(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let user_decoded: User = req['user'].data;
            let response           = await booking_history(user_decoded.id, +req.query.page, +req.query.limit);

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }
    
    /**
     * Get booked seat rows and column to determine available seats
     * @param req 
     * @param res 
     * @param next 
     */
    public async get_booked_seats(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let payload = req.body;
            let response           = await booked_seats(payload);

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next({ status: 400, message: error });
        }
    }

    public initRoutes() {
        this.router.get('/'                 , Utilities.check_auth, this.booking_history);
        this.router.post('/'                , Utilities.check_auth, this.book);
        this.router.post('/booked-seats'    , this.get_booked_seats);
    }

}
export default new BookingController().router;
