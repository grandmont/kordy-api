import { Table, Model, Column } from 'sequelize-typescript';

@Table
export default class User extends Model {
    @Column
    email: string;

    @Column
    password: string;

    @Column
    name: string;
}
