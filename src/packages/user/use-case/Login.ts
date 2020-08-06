import User from "../domain/User";

import Utilities from "../../../utilities/utli";

export const login = async(user: User): Promise<any> =>  {

    try {
        let user_found: User | undefined = await User
            .query()
            .first()
            // .eager('role')
            .where({ username: user.username })
            .limit(1);

        if (!user_found) {
            return { status: 404, message: 'user_not_found' };
        }


        let is_password_valid = await Utilities.is_password_valid(user.password, user_found!.password_digest);

        if (!is_password_valid) {
            return { status: 404, message: 'username_password_invalid' };
        }

        delete user_found!['password_digest'];

        let jwt = await Utilities.encode_jwt(user_found)

        let response = {
            user: user_found,
            jwt : jwt
        }

        return response;
    } catch (error) {
      return error.message;
    }

  }