import * as express      from "express";
import { IRequestParams } from "../models/requestParams";

class RequestBaseController {
    static GetRequestParams(request: express.Request) : IRequestParams {
        let params: IRequestParams = {
        id: request.query.id !== null || request.query.id !== undefined
                  ? request.query.id
                  : null,
        description: request.query.description !== null || request.query.description !== undefined
                           ? request.query.description
                           : null,
        location: request.query.location !== null || request.query.location !== undefined
                           ? request.query.location
                           : null
        };

        return params;
      }
}

export { RequestBaseController }