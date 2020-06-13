import {
    Table,
    Model,
    Column,
    AllowNull,
    BelongsToMany,
} from 'sequelize-typescript';

import Post from './Post';
import PostImage from './PostImage';

export interface ImageInterface {
    id?: number;
    key: string;
}

@Table({ tableName: 'images', updatedAt: false })
export default class Image extends Model<Image> implements ImageInterface {
    @AllowNull(false)
    @Column
    key: string;

    @BelongsToMany(() => Post, () => PostImage)
    posts: Post[];
}
