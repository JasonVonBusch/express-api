import { Entity, Column, PrimaryColumn } from "typeorm";
import { IArtifact }                     from "../../models/artifact";

@Entity()
export class ArtifactEntity implements IArtifact {
    @PrimaryColumn("numeric")
    id: number;

    @Column("numeric")
    artifactIds: [];

    @Column("text")
    description: string;

    @Column("path")
    location: string;

    @Column("date")
    timeStamp: Date;
};