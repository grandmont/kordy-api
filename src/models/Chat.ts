import {
    Table,
    Model,
    Column,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';

import Message from './Message';
import User from './User';
import UserChat from './UserChat';

@Table
export default class Chat extends Model {
    @Column
    name: string;

    @HasMany(() => Message)
    messages: Message[];

    @BelongsToMany(() => User, () => UserChat)
    users: User[];
}
