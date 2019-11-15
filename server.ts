import { App } from './app';

//import controllers
import { AboutController }        from "./controllers/about.controller";
import { ArtifactController }     from "./controllers/artifact.controller";
import { HomeController }         from "./controllers/home.controller";
import { StoryController }        from "./controllers/story.controller";
import { MergeRecordsController } from "./controllers/mergerecords.controller";
 
const app = new App(
  [
    //include controller in the list
    new AboutController(),
    new ArtifactController(),
    new HomeController(),
    new StoryController(),
    new MergeRecordsController()
  ],
  //port to listen on
  5000,
);
 
app.listen();