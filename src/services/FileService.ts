import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { s3 } from '../config/aws';
import { File } from 'formidable';

import Image from '../models/Image';

interface BufferInterface {
    name: string;
    type: string;
    buffer: Buffer;
}

export default class FileService {
    bucket: string;

    constructor() {
        const { AWS_BUCKET_NAME, NODE_ENV } = process.env;
        this.bucket = `${AWS_BUCKET_NAME}/${NODE_ENV}`;
    }

    generateBuffers = (files: File[]): BufferInterface[] =>
        files.map(({ path, type }) => ({
            name: uuidv4(),
            buffer: fs.readFileSync(path),
            type,
        }));

    upload = (files: BufferInterface[], path = '') =>
        Promise.all(
            files.map(
                ({ name, type, buffer }) =>
                    new Promise((resolve, reject) =>
                        s3.upload(
                            {
                                Key: name,
                                Bucket: `${this.bucket}/${path}`,
                                Body: buffer,
                                ContentType: type,
                                ACL: 'public-read',
                            },
                            async (error, data) =>
                                error || !data
                                    ? reject('Cannot upload file')
                                    : resolve(
                                          await Image.create({
                                              key: data.Key,
                                          }),
                                      ),
                        ),
                    ),
            ),
        );
}
