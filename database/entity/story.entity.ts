import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Story {
    @PrimaryColumn("numeric")
    id: number;

    @Column("text")
    description: string;

    @Column("numeric")
    artifactIds: [];

    @Column("date")
    timeStamp: Date;
};