import BaseService from './Base.service';
import Movie from '../model/Movie';
import { raw } from 'objection';

export class MovieService {

    constructor() { }

    public async get_all(user: any | undefined, page: number, size: number, search?: string | undefined) {
        let { offset, limit } = BaseService._normaliza_page(page, size);

        let query = Movie
            .query();

        if (user) {
            query
                .select('movies.*', 'Watchlists.id as is_in_watchlist')
                .leftJoin('Watchlists', (join) => {
                    join
                        .on('Watchlists.movie_id', '=', 'movies.id')
                        .andOn(raw('Watchlists.created_by = ?', user.id))
                        .andOn(raw('Watchlists.is_deleted = ?', false));
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

        let moves_mapped = movies.results.map(m => ({ ...m, is_in_watchlist: m.is_in_watchlist ? true : false }))


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

    public async get_by_id(user: any | undefined, id: string) {
        let query = Movie
            .query();

            if (user) {
            query
                .select('movies.*', 'Watchlists.id as is_in_watchlist')
                .leftJoin('Watchlists', (join) => {
                    join
                        .on('Watchlists.movie_id', '=', 'movies.id')
                        .andOn(raw('Watchlists.created_by = ?', user.id))
                        .andOn(raw('Watchlists.is_deleted = ?', false));
                });
        }

        let response = await query
            .findById(id)
            .debug(true);

        if (response) {
            let response_mapped = { ...response, is_in_watchlist: response.is_in_watchlist ? true : false }

            return response_mapped;
        }

        throw ({ message: 'notfound' })
    }

    public async create(payload: Movie) {
        return BaseService._create(Movie, payload);
    }

    public async update(id: string, payload: Movie) {
        return BaseService._update(Movie, id, payload, ['title', 'description', 'poster_path', 'budget', 'release_date', 'duration'])
    }

    public async delete(id: string) {
        return BaseService._soft_delete(Movie, id)
    }


}
export default new MovieService();
