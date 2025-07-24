import { Model, Column, PrimaryKey, DataType } from "sequelize-typescript";

export class DocumentModel extends Model<DocumentModel> {
  @PrimaryKey
  @Column({field: 'id', type:DataType.UUID})
  id?: string; 

  @Column
  path?: string;

  @Column({field: 'original_name'})
  originalName!: string;

  @Column({field: "size"})
  size!: number;

  @Column({field: "mime_type"})
  mimeType!: string;
}