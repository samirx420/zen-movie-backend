import Base from '../../../core/model/Base';
import { Model } from 'objection';
import User from '../../user/domain/User';

export default class Review extends Base {

    created_by: number;
    movie_id  : number;
    review    : string;

    static get tableName() {
        return 'reviews';
    }

    static get relationMappings() {
        return {
            user: {
                relation  : Model.BelongsToOneRelation,
                modelClass: User,
                join      : {
                    from: "reviews.created_by",
                    to  : "users.id"
                }
            },
        };
    }

}
