import BaseService from '../../../core/services/Base.service';

import Review from '../domain/Review';

export const update_review = async (id, payload: Review) => {
    return BaseService._update(Review, id, payload, ['review'])
}