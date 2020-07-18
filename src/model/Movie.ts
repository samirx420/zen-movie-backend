import Base from './Base';

export default class Movie extends Base {

    title      : string;
    description: string;

    static get tableName() {
        return 'movies';
    }

}
