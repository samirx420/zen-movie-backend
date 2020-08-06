import Movie from "../domain/Movie";
import { raw } from "objection";

export const movie_detail = async (user: any | undefined, id: string) => {
    let query = Movie
        .query();

    if (user) {
        query
            .select('movies.*', 'Watchlists.id as is_in_watchlist')
            .leftJoin('Watchlists', (join) => {
                join
                    .on('Watchlists.movie_id', '=', 'movies.id')
                    .andOn(raw('Watchlists.created_by = ?', user.id))
                    .andOn(raw('Watchlists.is_deleted = ?', false));
            });
    }

    let response = await query
        .findById(id)
        .debug(true);

    if (response) {
        let response_mapped = { ...response, is_in_watchlist: response.is_in_watchlist ? true : false }

        return response_mapped;
    }

    throw ({ message: 'notfound' })
}