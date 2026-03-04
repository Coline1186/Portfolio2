import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cv")
export class Cv {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    cv!: string;
}