import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("about")
export class About {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: true })
  position?: number;

  @Column()
  image!: string;
}
