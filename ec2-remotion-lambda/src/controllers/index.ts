import { render } from "../services/render-services";
import { Request } from "express";

export class RenderController {
  static Render = async (req: Request, res: any) => {
    await render();
    res.status(200).json({});
  };
}
