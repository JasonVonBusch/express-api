import { App } from './app';

//import controllers
import { AboutController } from "./controllers/about.controller";
import { HomeController } from "./controllers/home.controller";
 
const app = new App(
  [
    //include controller in the list
    new AboutController(),
    new HomeController(),
  ],
  //port to listen on
  5000,
);
 
app.listen();