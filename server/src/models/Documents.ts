import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  type_document: string;
}
