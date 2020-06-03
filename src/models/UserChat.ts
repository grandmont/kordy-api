import {
    Table,
    Model,
    Column,
    AllowNull,
    ForeignKey,
} from 'sequelize-typescript';

import User from './User';
import Chat from './Chat';

@Table({
    tableName: 'users_chats',
    timestamps: false,
})
export default class UserChat extends Model {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: number;

    @ForeignKey(() => Chat)
    @AllowNull(false)
    @Column
    chatId: number;
}
