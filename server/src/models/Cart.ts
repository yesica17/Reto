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
import StockController from "../controllers/StockController";

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

  @Column({ type: "float", nullable: true })
  amount: number;

  @Column({ name: "stock_id" })
  stockId: number;

  @ManyToOne(() => Stock, { nullable: true, eager: true })
  @JoinColumn({ name: "stock_id" })
  stocks: Stock;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Order, (order) => order.carts)
  @JoinColumn()
  order: Order;
}
