import { Model, Column, DataType } from "sequelize-typescript";

export class UserDetails extends Model<UserDetails> {
  @Column({ type: DataType.STRING, allowNull: false })
  public userId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public lastName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public middleName?: string;

  @Column({ type: DataType.JSON, allowNull: true })
  public address?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public phoneNumber?: string;
}