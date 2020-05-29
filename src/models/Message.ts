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

@Table
export default class Message extends Model {
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
