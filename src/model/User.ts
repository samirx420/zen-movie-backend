import { Model } from 'objection';

export default class User extends Model {

    id?            : number;
    first_name     : string;
    last_name      : string;
    username       : string;
    password       : string;
    avatar         : string;
    password_digest: string;
    create_at      : Date;
    // role_id        : number;
    modified_date  : Date;
    status         : boolean;

    static get tableName() {
        return 'users';
    }


    // static get relationMappings() {
    //     return {
    //         role: {
    //             relation  : Model.BelongsToOneRelation,
    //             modelClass: Role,
    //             join      : {
    //                 from: "tbl_users.role_id",
    //                 to  : "tbl_roles.id"
    //             }
    //         }
    //     };
    // }
    // static get relationMappings() {
    //     return {
    //         role: {
    //             relation  : Model.BelongsToOneRelation,
    //             modelClass: Role,
    //             join      : {
    //                 from: "tbl_users.role_id",
    //                 to  : "tbl_roles.id"
    //             }
    //         }
    //     };
    // }

}
