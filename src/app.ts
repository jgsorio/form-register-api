import express, { Application, NextFunction, Request, Response } from "express";

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
          return response.status(400).json({ error: error.message });
        }

        return response.status(500).json({ error: "Internal server error" });
      }
    );
  }

  private routes() {}
}

export default new App().app;
