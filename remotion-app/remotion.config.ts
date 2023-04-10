import { Config } from "remotion";
import { webpackOverride } from "./src/webpack-override";

Config.setOverwriteOutput(true);

Config.setCodec("h265");
Config.setQuality(100);
Config.setImageFormat("jpeg");
Config.overrideWebpackConfig(webpackOverride);
