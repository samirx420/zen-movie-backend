import Watchlist from "../domain/Watchlist";

import BaseService from '../../../core/services/Base.service';

export const add_to_watchlist = async (payload: Watchlist) => {

    let movie_found = await Watchlist
        .query()
        .first()
        .where({
            movie_id: payload.movie_id,
        });

    if (movie_found) {
        if (movie_found.is_deleted) {
            await Watchlist
                .query()
                .patch({
                    is_deleted: false
                })

            return { ...movie_found, is_deleted: false };
        }
        throw ({
            message: 'already added to watchlist'
        })
    }
    return BaseService._create(Watchlist, payload);
}
