import User from "../domain/User";

import Utilities from "../../../utilities/utli";

export const register = async(user: User): Promise<any> => {
    try {
        let user_found: User | undefined = await User
                .query()
                .first()
                .where({ username: user.username })
                .limit(1);

            if (user_found) {
                throw { status: 404, message: 'user_already_exists' };
            }

            let hash = await Utilities.hash(user.password);

            let new_user = await User
                .query()
                .insert({
                    first_name     : user.first_name,
                    last_name      : user.last_name,
                    username       : user.username,
                    password_digest: hash,
                    avatar         : user.avatar
                });

            delete new_user["password_digest"];
            return new_user;
    } catch (error) {
      return error.message;
    }

  }