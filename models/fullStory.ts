import { IArtifact } from "../models/artifact";

interface IFullStory {
    id: number;
    timeStamp: Date;
    description: string;
    artifactList: IArtifact[];
}

export { IFullStory }