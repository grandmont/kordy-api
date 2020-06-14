import {
    Table,
    Model,
    Column,
    AllowNull,
    ForeignKey,
} from 'sequelize-typescript';

import Post from './Post';
import Image from './Image';

@Table({ tableName: 'posts_images', timestamps: false })
export default class PostImage extends Model<PostImage> {
    @ForeignKey(() => Post)
    @AllowNull(false)
    @Column
    postId: number;

    @ForeignKey(() => Image)
    @AllowNull(false)
    @Column
    imageId: number;
}
