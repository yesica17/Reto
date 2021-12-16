import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { Stock } from "./Stock";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  req_quantity: number;

  @Column({ type: "boolean", default: true })
  state_cart: boolean;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToMany(() => Stock, {
    eager: true,
    //cascade: true,
  })
  @JoinTable({
    name: "cart_stock", // table name for the junction table of this relation
    joinColumn: {
      name: "cart",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "stock",
      referencedColumnName: "id",
    },
  })
  stocks: Stock[];

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Order, (order) => order.carts)
  @JoinColumn()
  order: Order;
}
