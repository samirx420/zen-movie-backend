import BaseService from './Base.service';
import Movie from '../../packages/movie/domain/Movie';
import Watchlist from '../../packages/watch-list/domain/Watchlist';

export class WatchlistService {

    constructor() { }

    public async get_my_watchlist(userId: number, page: number, size: number) {

        let { offset, limit } = BaseService._normaliza_page(page, size);
        let query = Watchlist
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
            data: watchlists.results,
            paged: {
                page: page,
                pageSize: limit,
                rowCount: watchlists.total,
                pageCount: Math.ceil(watchlists.total / size)
            }
        };

        return response;

    }

    public async create(payload: Watchlist) {

        let movie_found = await Watchlist
            .query()
            .first()
            .where({
                movie_id: payload.movie_id,
            });

        if (movie_found) {
            if (movie_found.is_deleted) {
                await Watchlist
                    .query()
                    .patch({
                        is_deleted: false
                    })

                return { ...movie_found, is_deleted: false };
            }
            throw ({
                message: 'already added to watchlist'
            })
        }
        return BaseService._create(Watchlist, payload);
    }

    public async delete(movie_id: string) {
        let resultDelete = await Watchlist
            .query()
            .delete()
            .where({ movie_id: movie_id }).debug(true);

        return { message: 'delete success' };
        // let result = await Watchlist
        //     .query()
        //     .first()
        //     .where({
        //         movie_id: movie_id
        //     }).debug(true);

        // if (result) {
        //     let resultDelete = await Watchlist
        //         .query()
        //         .patch({
        //             is_deleted: true
        //         })
        //         .where({ movie_id: movie_id }).debug(true);

        //     return { message: 'delete success' };
        // }

        // throw ({
        //     message: 'not found with id ' + movie_id
        // })


    }
}
export default new WatchlistService();
