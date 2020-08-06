import BaseService from '../../../core/services/Base.service';

import Review from '../domain/Review';

export const delete_review = async (id: string) => {
    return BaseService._soft_delete(Review, id)
}