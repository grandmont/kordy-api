import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import { Request, Response } from 'express';

import PostService from '../services/PostService';
import FileService from '../services/FileService';

const POST = {
    createPost: async (req: Request, res: Response) => {
        try {
            const { user } = req.body;

            await new Promise((resolve, reject) => {
                const form = new formidable.IncomingForm();

                form.multiples = true;

                form.parse(req, async (error, fields, { files }) => {
                    if (error) {
                        return reject(error);
                    }

                    if (Object.keys(files).length) {
                        const buffers = [];

                        Object.keys(files).forEach((key) => {
                            const { path, type } = files[key];
                            const buffer = fs.readFileSync(path);

                            buffers.push({
                                name: uuidv4(),
                                buffer,
                                type,
                            });
                        });

                        try {
                            const response = await new FileService().upload(
                                buffers,
                                'posts',
                            );

                            return resolve(response);
                        } catch (error) {
                            return reject(error);
                        }
                    }

                    return resolve();
                });
            });

            const postService = new PostService();

            res.status(201).send({ status: true });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

export default { ...POST };
