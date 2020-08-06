import BaseService from '../../../core/services/Base.service';

import Movie from '../domain/Movie';

export const create_movie = async(payload: Movie) => {
    return BaseService._create(Movie, payload);
}