import "express-async-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import { ResponseStatus } from "./utils/response-status";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());

    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ): any => {
        if (error instanceof Error) {
          return response
            .status(ResponseStatus.BAD_REQUEST)
            .json({ error: error.message });
        }

        return response
          .status(ResponseStatus.SERVER_ERROR)
          .json({ error: "Internal server error" });
      }
    );
  }

  private routes() {}
}

export default new App().app;
