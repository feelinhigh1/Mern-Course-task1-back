import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface Address {
  street: string;
  suite?: string;
  city: string;
  zipcode?: string;
}

interface Company {
  name: string;
}

@Table({
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id?: number;

  @Column({ type: DataType.STRING })
  public name!: string;

  @Column({ type: DataType.STRING })
  public email!: string;

  @Column({ type: DataType.STRING })
  public username!: string;

  @Column({ type: DataType.STRING })
  public password!: string;

  @Column({ type: DataType.STRING })
  public phone!: string;

  @Column({ type: DataType.STRING })
  public website!: string;

  // JSON column for Address
  @Column({ type: DataType.JSON })
  public address!: Address;

  // JSON column for Company
  @Column({ type: DataType.JSON })
  public company!: Company;
}
