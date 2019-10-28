import * as express      from "express";
import { RequestParams } from "../models/requestParams";

class RequestBaseController {
    static GetRequestParams(request: express.Request) : RequestParams {
        let params = new RequestParams();
        params.id = request.query.id !== null || request.query.id !== undefined
                  ? request.query.id
                  : null;
    
        params.description = request.query.description !== null || request.query.description !== undefined
                           ? request.query.description
                           : null;
    
        params.location = request.query.location !== null || request.query.location !== undefined
                           ? request.query.location
                           : null;
        return params;
      }
}

export { RequestBaseController }