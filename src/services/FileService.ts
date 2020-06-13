import { s3 } from '../config/aws';

export default class FileService {
    upload = (files, path = '') => {
        const { AWS_BUCKET_NAME, NODE_ENV } = process.env;

        return Promise.all(
            files.map(
                ({ name, type, buffer }) =>
                    new Promise((resolve, reject) =>
                        s3.upload(
                            {
                                Key: name,
                                Bucket: `${AWS_BUCKET_NAME}/${NODE_ENV}/${path}`,
                                Body: buffer,
                                ContentType: type,
                                ACL: 'public-read',
                            },
                            (err, files) => {
                                if (err || !files)
                                    return reject('Cannot upload file');
                                return resolve(files);
                            },
                        ),
                    ),
            ),
        );
    };
}
