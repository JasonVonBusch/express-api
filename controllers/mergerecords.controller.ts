//what this controller should do is allow the user to call getfullstory
//passing in the story id and returning all the information related
//to the story including artifacts in a format defined by the datatype
import * as express              from "express";
import { Artifact }              from "../models/artifact";
import { ArtifactController }    from "./artifact.controller";
import { FullStory }              from "../models/fullStory";
import { RequestBaseController } from "./requestbase.controller";
import { StoryController }       from "./story.controller";

class MergeRecordsController {
    public router = express.Router();

    constructor() {
        this.InitializeRoutes()
    }

    InitializeRoutes() {
        this.router.get("/getfullstory", this.getFullStory)
    }

    getFullStory = (request: express.request, response: express.response) => {
        let params = RequestBaseController.GetRequestParams(request);
        let fullStory = this.Merge(params.id)

        if (fullStory) {
            response.send(JSON.stringify(fullStory));
        } else {
            response.send("error: invalid parameters");
        }
    }

    Merge(id: number) : any {
        let foundStory = StoryController.GetStoryById(id);
        if (foundStory) {
            let returnObj = new FullStory(id, foundStory.timestamp, foundStory.description);
            let artifactListJSON = ArtifactController.GetArtifactArchive();

            console.log("merging changes...");
            foundStory.artifactIds.forEach((artifactId: number) => {
                let foundArtifact = artifactListJSON.artifacts.find((artifact: { id: number; }) => {
                    return artifact.id === artifactId;
                });

                if (foundArtifact) {
                    let today = new Date(Date.now.toString());
                    let newArtifact = new Artifact(foundArtifact.id, foundArtifact.description, foundArtifact.location, today)
                    returnObj.artifactList.push(newArtifact);
                } else {
                    console.log("error: invalid artifact id");
                }
            });

            return returnObj;
        }
        return null;
    }
}

export { MergeRecordsController }