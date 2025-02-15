import { Request, Response } from "express";
import { z } from "zod";
import User from "../models/user.model";
import { ResponseStatus } from "../utils/response-status";

export class UserController {
  async create(request: Request, response: Response): Promise<any> {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      avatar: z.string().optional(),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const avatar = request.file?.filename;

    await User.create({ name, email, password, avatar });

    return response
      .status(ResponseStatus.CREATED)
      .json({ message: "User created" });
  }
}

export default new UserController();
