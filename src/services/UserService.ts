import User from '../models/User';

export default class UserService {
    getUserById = (userId: string): Promise<object> =>
        new Promise((resolve, reject) =>
            User.findByPk(userId)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );

    createUser = (userData): Promise<object> =>
        new Promise((resolve, reject) =>
            User.create(userData)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );
}
