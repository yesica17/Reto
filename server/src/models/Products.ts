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

  @Column({ type: "boolean", default: true })
  status_product: boolean;

  @CreateDateColumn()
  created_at: "string";

  @UpdateDateColumn()
  updated_at: "string";

  @ManyToMany(() => Category, {
    eager: true,
    //cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Style, {
    eager: true,
    //cascade: true,
  })
  @JoinTable()
  styles: Style[];

  @ManyToMany(() => Brand, {
    eager: true,
    //cascade: true,
  })
  @JoinTable()
  brands: Brand[];
}
