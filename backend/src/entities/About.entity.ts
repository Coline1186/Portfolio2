import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("about")
export class About {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    image!: string;
}