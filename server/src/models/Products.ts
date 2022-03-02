import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Category } from "./Categories";
import { Style } from "./Styles";
import { Brand } from "./Brands";
import { Stock } from "./Stock";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 300 })
  desc: string;

  @Column({ type: "varchar", length: 250 })
  img: string;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "boolean", default: false })
  status_product: boolean;

  @CreateDateColumn()
  created_at: "string";

  @UpdateDateColumn()
  updated_at: "string";

  @Column({ type: "int", nullable: true})
  views: number;

  @ManyToMany(() => Category, {
    eager: true,    
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Style, {
    eager: true,    
  })
  @JoinTable()
  styles: Style[];

  @ManyToMany(() => Brand, {
    eager: true,    
  })
  @JoinTable()
  brands: Brand[];

  @OneToMany(() => Stock, (stock) => stock.product, {})
  @JoinColumn()
  stock: Stock[];
}
