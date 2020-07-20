import BaseService from './Base.service';
import Movie from '../model/Movie';
import { raw } from 'objection';

export class MovieService {

    constructor() { }

    public async get_all(user:any | undefined, page: string, size: string) {
        let { offset, limit } = BaseService._normaliza_page(page, size);

        let query = Movie
                .query();

        if(user){
            query
            .select('movies.*','Watchlists.id as is_in_watchlist')
            .leftJoin('Watchlists', (join) => {
                join
                .on('Watchlists.movie_id', '=', 'movies.id')
                .andOn(raw('Watchlists.created_by = ?', user.id));
            });
        }

        let movies = await query
            .where({
                'movies.is_deleted': false
            })
            .page(offset, limit);

        let moves_mapped = movies.results.map(m => ({...m, is_in_watchlist: m.is_in_watchlist? true: false}))


        let response = {
            data: moves_mapped,
            paged: {
                page: page,
                pageSize: size,
                rowCount: movies.total,
                pageCount: Math.ceil(movies.total / parseInt(size))
            }
        };

        return response;
    }

    public async get_by_id(id: string) {
        return BaseService._get_by_id(Movie, id);
    }

    public async create(payload: Movie) {
        return BaseService._create(Movie, payload);
    }

    public async update(id: string, payload: Movie) {
        return BaseService._update(Movie, id, payload, ['title', 'description'])
    }
   
    public async delete(id: string) {
        return BaseService._soft_delete(Movie, id)
    }


}
export default new MovieService();
