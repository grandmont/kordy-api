import formidable from 'formidable';
import { Request, Response } from 'express';

import PostService from '../services/PostService';
import FileService from '../services/FileService';

const GET = {
    getPostById: async (req: Request, res: Response) => {
        try {
            const { postId } = req.params;

            const postService = new PostService();

            const post = await postService.getPostById(postId);

            if (!post) {
                throw new Error(`No post found with the id ${postId}.`);
            }

            res.status(200).send(post);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    getPosts: async (req: Request, res: Response) => {
        try {
            const { offset } = req.headers;

            if (!offset) {
                throw new Error('No offset was provided.');
            }

            const postService = new PostService();

            const posts = await postService.getPosts(
                parseInt(offset.toString()) || 0,
            );

            res.status(200).send(posts);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

const POST = {
    createPost: async (req: Request, res: Response) => {
        try {
            const {
                user: { id: userId },
            } = req.body;

            const response = await new Promise((resolve, reject) => {
                const form = Object.assign(new formidable.IncomingForm(), {
                    multiples: true,
                });

                form.parse(req, async (error, fields, { files }) => {
                    if (error) return reject(error);

                    const post = await new PostService().createPost({
                        userId,
                        content: fields.content,
                    });

                    if (files) {
                        const fileService = new FileService();

                        // Checks if it's an array instace (multiple files) or a single object
                        const buffers = fileService.generateBuffers(
                            files instanceof Array ? files : [{ ...files }],
                        );

                        // Try to upload the files
                        try {
                            const uploads = await fileService.upload(
                                buffers,
                                'posts',
                            );

                            post.setImages(uploads.map(({ id }) => id));
                        } catch (error) {
                            return reject(error);
                        }
                    }

                    return resolve(post);
                });
            });

            res.status(201).send(response);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

export default { ...GET, ...POST };
