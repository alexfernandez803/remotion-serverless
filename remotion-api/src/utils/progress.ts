import { RenderProgress } from "@remotion/lambda/client";

export type Finality =
  | {
      type: "success";
      url: string;
    }
  | {
      type: "error";
      errors: string;
    };

export const getFinality = (
  renderProgress: RenderProgress
): Finality | null => {
  if (renderProgress.outputFile) {
    return {
      type: "success",
      url: renderProgress.outputFile,
    };
  }
  if (renderProgress.fatalErrorEncountered) {
    return {
      type: "error",
      errors: renderProgress.errors[0].stack,
    };
  }
  return null;
};
