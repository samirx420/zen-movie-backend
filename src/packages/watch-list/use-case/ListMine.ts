import Watchlist from '../domain/Watchlist';

import BaseService from '../../../core/services/Base.service';

export const get_my_watchlist = async (userId: number, page: number, size: number) => {

    let { offset, limit } = BaseService._normaliza_page(page, size);
    let query             = Watchlist
        .query()
        .select('movies.*')
        .leftJoin('movies', (join) => {
            join
                .on('movies.id', '=', 'watchlists.movie_id')
        })
        .where({
            'watchlists.created_by': userId,
            'watchlists.is_deleted': false
        })
        .page(offset, limit);

    let watchlists = await query;

    let response = {
        data : watchlists.results,
        paged: {
            page     : page,
            pageSize : limit,
            rowCount : watchlists.total,
            pageCount: Math.ceil(watchlists.total / size)
        }
    };

    return response;

}
