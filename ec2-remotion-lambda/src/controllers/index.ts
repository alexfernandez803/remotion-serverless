import { render } from "../services/render-services";
import { Request } from "express";

export class RenderController {
  static Render = async (req: Request, res: any) => {
    try {
      const { renderId, bucketName } = await render();
      res.status(200).json({
        message: "Video rendered.",
        renderId,
        bucketName,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
