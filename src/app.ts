import "express-async-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import { ResponseStatus } from "./utils/response-status";
import router from "./router";
import cors from "cors";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
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

  private routes() {
    this.app.use(router);
  }
}

export default new App().app;
