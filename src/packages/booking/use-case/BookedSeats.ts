
import Booking from '../domain/Booking';

export const booked_seats = async (payload) => {
    let query = Booking
        .query()
        .select(
            'bookings.seat_row'
            , 'bookings.seat_column'
        )
        .where({
            movie_id    : payload.movie_id,
            booking_date: payload.booking_date
        })


    let bookings = await query;

    let response = {
        data : bookings,
        paged: {
        }
    };

    return response;
}