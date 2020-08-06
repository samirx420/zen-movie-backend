import BaseService from '../../../core/services/Base.service';

import Movie from '../domain/Movie';

export const delete_movie =  async(id: string) => {
    return BaseService._soft_delete(Movie, id)
}