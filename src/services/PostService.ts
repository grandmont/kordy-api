import Post from '../models/Post';

export default class PostService {
    getPostById = () => {};

    getPosts = () => {};

    createPost = ({ userId, content }): Promise<Post> =>
        new Promise((resolve, reject) =>
            Post.create({
                content,
                userId,
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );
}
