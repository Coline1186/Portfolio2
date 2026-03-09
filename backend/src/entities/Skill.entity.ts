import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project.entity";

@Entity("skill")
export class Skill {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    position!: number;

    @Column()
    name!: string;

    @Column()
    logo!: string;

    @ManyToMany(() => Project, project => project.skills)
    projects!: Project[];
}
