import { VERSION } from "remotion";
import * as dotenv from "dotenv";
dotenv.config();
/**
 * Config file
 */
const config: {
  port: number;
  remotionRoleArn: string;
  remotionRoleSession: string;
} = {
  port: Number(process.env.PORT) ?? 8080,
  remotionRoleArn: process.env.REMOTION_ROLE_ARN ?? "",
  remotionRoleSession: process.env.REMOTION_ROLE_SESSION_NAME ?? "",
};
export default config;
export const COMP_NAME = "main";
export const SITE_ID = `remotion-render-app-${VERSION}`;
