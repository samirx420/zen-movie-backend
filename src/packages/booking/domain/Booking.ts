import Base from '../../../core/model/Base';
import User from '../../user/domain/User';

export default class Booking extends Base {

    created_by  : number;
    movie_id    : number;
    seat_row    : number;
    seat_column : number;
    show_time   : string;
    booking_date: Date;

    user:User;

    static get tableName() {
        return 'bookings';
    }

}
