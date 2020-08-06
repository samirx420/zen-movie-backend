import User from "../domain/User";

import Utilities from "../../../utilities/utli";

export const my_profile_update = async (user: User, user_decoded: User): Promise<any> => {

    try {

        let user_detail = await User.query()
            .findById(user_decoded.id);

        let user_updated = await User
            .query()
            .patch({
                first_name     : user.first_name    || user_detail.first_name,
                last_name      : user.last_name     || user_detail.last_name,
                password_digest: user.password ? await Utilities.hash(user.password): user_detail.password_digest,
                avatar         : user.avatar        || user_detail.avatar
            })
            .where({ id: user_decoded.id });


        return { message: 'user updated' };

    } catch (error) {
        console.log(error)
        return error.message;
    }

}