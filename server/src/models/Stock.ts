import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Size } from "./Sizes";
import { Color } from "./Colors";
import { Product } from "./Products";

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  available_quantity: number;

  @Column({ name: "size_id" })
  sizeId: number;

  @Column({ name: "color_id" })
  colorId: number;

  @Column({ name: "product_id" })
  productId: number;

  @Column({ type: "boolean", default: true })
  status_stock: boolean;

  @ManyToOne(() => Size, { nullable: false, eager: true })
  @JoinColumn({ name: "size_id" })
  size: Size;

  @ManyToOne(() => Color, { nullable: false, eager: true })
  @JoinColumn({ name: "color_id" })
  color: Color;

  @ManyToOne(() => Product, (product) => product.stock, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
