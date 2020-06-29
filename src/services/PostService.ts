import Post from '../models/Post';
import User from '../models/User';
import Image from '../models/Image';

export default class PostService {
    getPostById = (postId: string): Promise<Post> =>
        new Promise((resolve, reject) =>
            Post.findByPk(postId, {
                attributes: ['id', 'content', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: User,
                        attributes: ['kordy'],
                    },
                    {
                        model: Image,
                        as: 'images',
                        attributes: ['key'],
                        through: { attributes: [] },
                    },
                ],
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );

    getPosts = (offset: number): Promise<Post[]> =>
        new Promise((resolve, reject) =>
            Post.findAll({
                offset,
                limit: 10,
                attributes: ['id', 'content', 'createdAt', 'updatedAt'],
                order: [['id', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['kordy'],
                    },
                    {
                        model: Image,
                        as: 'images',
                        order: [['key', 'DESC']],
                        attributes: ['key'],
                        through: { attributes: [] },
                    },
                ],
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );

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
