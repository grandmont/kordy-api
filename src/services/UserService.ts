import User, { UserInterface } from '../models/User';

export default class UserService {
    getUserById = (userId: string): Promise<User> =>
        new Promise((resolve, reject) =>
            User.findByPk(userId)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );

    getUserByAttribute = (
        attribute: 'kordy' | 'email',
        value: string,
    ): Promise<User> =>
        new Promise((resolve, reject) =>
            User.findOne({
                where: {
                    [attribute]: value,
                },
                attributes: ['id', 'kordy', 'email', 'password'],
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );

    createUser = (userData: UserInterface): Promise<User> =>
        new Promise((resolve, reject) =>
            User.create(userData)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );
}
