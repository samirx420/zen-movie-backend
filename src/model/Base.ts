import { Model } from 'objection';

export default class Base extends Model {

    id?        : number;
    create_at  : Date;
    modified_at: Date;
    deleted_at : Date;
    is_deleted : boolean;

}
