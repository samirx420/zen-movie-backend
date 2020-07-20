import Base from './Base';

export default class Movie extends Base {

    title          : string;
    description    : string;
    is_in_watchlist: boolean;

    static get tableName() {
        return 'movies';
    }

}
