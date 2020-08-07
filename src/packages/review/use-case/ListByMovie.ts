import BaseService from '../../../core/services/Base.service';

import Review from '../domain/Review';

export const list_review_by_movie = async (movieId: number, page: number, size: number) => {

    let { offset, limit } = BaseService._normaliza_page(page, size);
    let query             = Review
        .query()
        .eager('user')
        .where({
            'reviews.movie_id'  : movieId,
            'reviews.is_deleted': false
        })
        .page(offset, limit);

    let reviews = await query;

    let response = {
        data : reviews.results,
        paged: {
            page     : page,
            pageSize : limit,
            rowCount : reviews.total,
            pageCount: Math.ceil(reviews.total / size)
        }
    };

    return response;

}