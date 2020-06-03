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

export interface ChatInterface {
    name: string;
    messages?: Message[];
    users?: User[];
}

@Table({ tableName: 'chats' })
export default class Chat extends Model<Chat> implements ChatInterface {
    [addUser: string]: any;

    @Column
    name: string;

    @HasMany(() => Message)
    messages: Message[];

    @BelongsToMany(() => User, () => UserChat)
    users: User[];
}
