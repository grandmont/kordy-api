import User from '../models/User';

export default class UserService {
    createUser = (
        email: string,
        password: string,
        name: string,
    ): Promise<object> =>
        new Promise((resolve, reject) =>
            User.create({ email, password, name })
                .then(response => resolve(response))
                .catch(error => reject(error)),
        );
}
