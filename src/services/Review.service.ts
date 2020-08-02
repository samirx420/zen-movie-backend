import BaseService from './Base.service';
import Review from '../model/Review';

export class WatchlistService {

    constructor() { }

    public async get_review_by_movie(movieId: number, page: number, size: number) {

        let { offset, limit } = BaseService._normaliza_page(page, size);
        let query = Review
            .query()
            .where({
                'reviews.movie_id': movieId,
                'reviews.is_deleted': false
            })
            .page(offset, limit);

        let reviews = await query;

        let response = {
            data: reviews.results,
            paged: {
                page: page,
                pageSize: limit,
                rowCount: reviews.total,
                pageCount: Math.ceil(reviews.total / size)
            }
        };

        return response;

    }

    public async create_review(payload: Review) {
        return BaseService._create(Review, payload);
    }
    
    public async update_review(id, payload:Review) {
        return BaseService._update(Review, id, payload, ['review'])
    }

    public async delete(id: string) {
        return BaseService._soft_delete(Review, id)
    }
}
export default new WatchlistService();
