import { raw } from 'objection';

import BaseService from '../../../core/services/Base.service';

import Movie from '../domain/Movie';

export const list_movie = async (user: any | undefined, page: number, size: number, search?: string | undefined) => {
    let { offset, limit } = BaseService._normaliza_page(page, size);

    let query = Movie
        .query();

    if (user) {
        query
            .select(
                'movies.*'
                , 'Watchlists.id as is_in_watchlist'
                , 'bookings.id as has_booked'
            )
            .leftJoin('Watchlists', (join) => {
                join
                    .on('Watchlists.movie_id', '=', 'movies.id')
                    .andOn(raw('Watchlists.created_by = ?', user.id))
                    .andOn(raw('Watchlists.is_deleted = ?', false));
            })
            .leftJoin('bookings', (join) => {
                join
                    .on('bookings.movie_id', '=', 'movies.id')
                    .andOn(raw('bookings.created_by = ?', user.id))
            });
    }

    if (search) {
        query.where('movies.title', 'like', search);
    }

    let movies = await query
        .where({
            'movies.is_deleted': false
        })
        .page(offset, limit);

    let moves_mapped = movies.results.map(m => ({ 
        ...m
        , is_in_watchlist: m.is_in_watchlist ? true : false 
        , has_booked: m.has_booked ? true : false 
    }))


    let response = {
        data : moves_mapped,
        paged: {
            page     : page,
            pageSize : size,
            rowCount : movies.total,
            pageCount: Math.ceil(movies.total / size)
        }
    };

    return response;
}