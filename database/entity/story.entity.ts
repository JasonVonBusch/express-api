import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Story {
    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    artifactIds: [];

    @Column()
    timeStamp: Date;
};