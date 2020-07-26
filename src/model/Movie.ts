import Base from './Base';

export default class Movie extends Base {

    title          : string;
    description    : string;
    poster_path    : string;
    duration       : number;
    budget         : number;
    release_date   : Date;
    is_in_watchlist: boolean;

    static get tableName() {
        return 'movies';
    }

}
