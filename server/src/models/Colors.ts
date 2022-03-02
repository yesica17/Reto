import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Color extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column({ type: "varchar", length: 250, nullable: true  })
  color_spa: string;
}
