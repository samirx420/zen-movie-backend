import User from '../model/User';
import Utilities from "../utilities/utli";

export class UserService {

  constructor() { }

  public async login(user: User): Promise<any> {

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
      return error;
    }

  }

  public async register(user: User): Promise<any> {
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
      return error;
    }

  }

  public async my_profile(user_decoded: User): Promise<any> {
    try {

        let user_detail = await User
            .query()
            .findById(user_decoded.id);

        delete user_detail['password_digest'];

        return user_detail;
    } catch (error) {
      console.log(error)
      return error.message;
    }
  }

  public async my_profile_update(user:User, user_decoded: User): Promise<any> {

    try {

        let user_detail = await User.query()
            .findById(user_decoded.id);

        let user_updated = await User
            .query()
            .patch({
                first_name     : user.first_name || user_detail.first_name,
                last_name      : user.last_name || user_detail.last_name,
                password_digest: user.password ? await Utilities.hash(user.password): user_detail.password_digest,
                avatar         : user.avatar || user_detail.avatar
            })
            .where({ id: user_decoded.id });


        return { message: 'user updated' };

    } catch (error) {
      console.log(error)
      return error.message;
    }

  }
}

export default new UserService();