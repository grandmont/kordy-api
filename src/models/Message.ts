import {
    Table,
    Model,
    Column,
    AllowNull,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';

import User from './User';
import Chat from './Chat';

export interface MessageInterface {
    content: string;
    userId: number;
    chatId: number;
}

@Table({ tableName: 'messages' })
export default class Message extends Model<Message>
    implements MessageInterface {
    @Column
    content: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: number;

    @BelongsTo(() => Chat)
    chat: Chat;

    @ForeignKey(() => Chat)
    @AllowNull(false)
    @Column
    chatId: number;
}
