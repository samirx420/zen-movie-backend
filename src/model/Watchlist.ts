import Base from './Base';

export default class Watchlist extends Base {

    created_by: number;
    movie_id  : number;

    static get tableName() {
        return 'watchlists';
    }

}
