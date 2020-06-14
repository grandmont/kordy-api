import {
    Table,
    Model,
    Column,
    AllowNull,
    Unique,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';

import Message from './Message';
import Chat from './Chat';
import UserChat from './UserChat';
import Post from './Post';

export interface UserInterface {
    id?: number;
    kordy: string;
    email: string;
    password: string;
    name: string;
}

@Table({ tableName: 'users' })
export default class User extends Model<User> implements UserInterface {
    @AllowNull(false)
    @Unique(true)
    @Column
    kordy: string;

    @AllowNull(false)
    @Unique(true)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    name: string;

    @HasMany(() => Message)
    messages: Message[];

    @HasMany(() => Post)
    posts: Post[];

    @BelongsToMany(() => Chat, () => UserChat)
    chats: Chat[];
}
