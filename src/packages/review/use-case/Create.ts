import BaseService from '../../../core/services/Base.service';

import Review from '../domain/Review';

export const create_review = async (payload: Review) => {
    return BaseService._create(Review, payload);
}