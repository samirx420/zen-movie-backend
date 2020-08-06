import Movie from "../domain/Movie"

import BaseService from '../../../core/services/Base.service';

export const update_movie = async(id: string, payload: Movie) =>  {
    return BaseService._update(Movie, id, payload, ['title', 'description', 'poster_path', 'budget', 'release_date', 'duration'])
}