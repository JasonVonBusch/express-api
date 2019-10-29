import { Artifact } from "../models/artifact";

class FullStory {
    constructor(public id: number, public timeStamp: Date = new Date(), public description: string = "", public artifactList: Artifact[] = []) { }
}

export { FullStory }