import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Document } from "./Documents";
import { UserContact } from "./UserContact";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false, unique: true })
  document: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "boolean", default: false })
  isAdmin: boolean;

  @Column({ type: "boolean", default: true })
  status_user: boolean;

  @CreateDateColumn()
  created_at: "string";

  @UpdateDateColumn()
  updated_at: "string";

   @Column({ type: "varchar", nullable: true })
  token: string;

  @ManyToOne(() => Document)
  @JoinColumn()
  public type_document: Document;
}
