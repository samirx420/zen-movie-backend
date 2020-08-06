import User from "../domain/User";

export const my_profile = async (user_decoded: User): Promise<any> => {
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