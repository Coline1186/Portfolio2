import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill.entity";

@Entity("project")
export class Project {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ nullable: true })
    position?: number;

    @Column()
    name!: string;

    @Column()
    image!: string;

    @Column({ nullable: true })
    githubLink?: string;

    @Column({ nullable: true })
    webLink?: string;

    @ManyToMany(() => Skill)
    @JoinTable({
        name: "project_skills",
        joinColumn: { name: "project_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "skill_id", referencedColumnName: "id" },
    })
    skills!: Skill[];
}
