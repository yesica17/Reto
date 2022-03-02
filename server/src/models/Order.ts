import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { UserContact } from "./UserContact";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  amount: number;

  @Column({ type: "boolean", default: true })
  state_order: boolean;

  @CreateDateColumn()
  created_at: "string";

  @UpdateDateColumn()
  updated_at: "string";

  @OneToMany(() => Cart, (cart) => cart.order, {
    eager: true,
  })
  @JoinColumn()
  carts: Cart[];

  @ManyToOne(() => UserContact, {
    eager: true,
  })
  @JoinColumn()
  contact: UserContact;
}
