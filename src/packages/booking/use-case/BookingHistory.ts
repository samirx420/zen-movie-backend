import BaseService from '../../../core/services/Base.service';

import Booking from '../domain/Booking';

export const booking_history = async (userId: number, page: number, size: number) => {
    let { offset, limit } = BaseService._normaliza_page(page, size);
    let query             = Booking
        .query()
        .select(
            'movies.*'
            , 'bookings.seat_row'
            , 'bookings.seat_column'
            , 'bookings.show_time'
            , 'bookings.booking_date'
        )
        .leftJoin('movies', (join) => {
            join
                .on('movies.id', '=', 'bookings.movie_id')
        })
        .where({
            'bookings.created_by'  : userId,
            'watchlists.is_deleted': false
        })
        .page(offset, limit);

    let bookings = await query;

    let response = {
        data : bookings.results,
        paged: {
            page     : page,
            pageSize : limit,
            rowCount : bookings.total,
            pageCount: Math.ceil(bookings.total / size)
        }
    };

    return response;
}