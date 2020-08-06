import Watchlist from "../domain/Watchlist";

export const remove_from_watchlist = async (movie_id: string) => {
    let resultDelete = await Watchlist
        .query()
        .delete()
        .where({ movie_id: movie_id }).debug(true);

    return { message: 'delete success' };



}