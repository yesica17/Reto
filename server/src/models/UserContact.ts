import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class UserContact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  state: string;

  @Column({ type: "varchar", length: 100 })
  city: string;

  @Column({ type: "varchar", length: 100 })
  adress: string;

  @Column({ name: "user_id" })
  userId: number;

  @OneToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  users: User;
}
