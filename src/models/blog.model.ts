import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Category } from "./category.model";
import { User } from "./user.model";  // You should have a User model

@Table({
  tableName: "blogs",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Blog extends Model<Blog> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @Column({ type: DataType.STRING })
  public slug!: string;

  @Column({ type: DataType.STRING })
  public title!: string;

  @Column({ type: DataType.TEXT })
  public description!: string;

  @Column({ type: DataType.STRING })
  public hashtag!: string;

  @ForeignKey(() => Category)
  @Column({ field: "category_id", type: DataType.INTEGER })
  public categoryId!: number;

  @ForeignKey(() => User)
  @Column({ field: "posted_by", type: DataType.INTEGER })
  public postedBy!: number;
}
