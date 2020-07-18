import BaseService from './Base.service';
import Movie from '../model/Movie';

export class MovieService {

    constructor() { }

    public async get_all(page: string, limit: string) {
        return BaseService._get_all_paged({ model: Movie, page: page, limit: limit });
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
