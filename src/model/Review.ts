import Base from './Base';

export default class Review extends Base {

    created_by: number;
    movie_id  : number;
    review    : string;

    static get tableName() {
        return 'reviews';
    }

}
