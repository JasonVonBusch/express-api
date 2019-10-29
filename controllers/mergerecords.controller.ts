//what this controller should do is allow the user to call getfullstory
//passing in the story id and returning all the information related
//to the story including artifacts in a format defined by the datatype
import * as express              from "express";
import { ArtifactController }    from "./artifact.controller";
import { RequestBaseController } from "./requestbase.controller";
import { StoryController }       from "./story.controller";

class MergeRecordsController {
    public router = express.Router();

    constructor() { }

    InitializeRoutes() {
        this.router.get("", this.getFullStory)
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
        let found = StoryController.GetStoryById(id);
        if (found) {
            console.log("merging changes...");
            let parentData = JSON.parse(found);
            let childData = JSON.parse(ArtifactController.GetArtifactArchive());

            parentData.artifactList.push(childData.artifacts);
            return parentData;
        }
        return null;
    }
}

export { MergeRecordsController }