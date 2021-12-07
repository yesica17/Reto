import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Size, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  sizes: Size[];

  @ManyToMany(() => Color, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Product, (product) => product.stocks, {
    eager: true,
  })
  @JoinTable()
  products: Product[];
}
