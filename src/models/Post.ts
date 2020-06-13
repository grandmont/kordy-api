import {
    Table,
    Model,
    Column,
    AllowNull,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';

import User from './User';
import Image from './Image';
import PostImage from './PostImage';

export interface PostInterface {
    id?: number;
    content?: string;
    userId: number;
}

@Table({ tableName: 'posts' })
export default class Post extends Model<Post> implements PostInterface {
    @Column
    content: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Image, () => PostImage)
    images: Image[];
}
