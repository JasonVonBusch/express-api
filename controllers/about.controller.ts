import * as express from "express";
import { About } from "../models/about";

class AboutController {
  public path = "/about";
  public router = express.Router();

  constructor() { 
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAboutPage);
  }

  getAboutPage = (request: express.Request, response: express.Response) => {
    let about = new About(this.Title(), this.Description());
    response.send(about);
  }

  Title(): string {
    return "About";
  }

  Description(): string {
    return "This should say something that describes the application.";
  }
}

export { AboutController }
