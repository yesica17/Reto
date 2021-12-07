import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Categories";
import { Style } from "./Styles";
import { Brand } from "./Brands";
import { Stock } from "./Stock";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Category, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Style, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  styles: Style[];

  @ManyToMany(() => Brand, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  brands: Brand[];

  @ManyToMany(() => Stock, (stock) => stock.products, {})
  @JoinTable()
  stocks: Stock[];
}
