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

@Table
export default class User extends Model {
    @AllowNull(false)
    @Unique(true)
    @Column
    kordy: string;

    @AllowNull(false)
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

    @BelongsToMany(() => Chat, () => UserChat)
    chats: Chat[];
}
