import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./src/webpack-override";

Config.setOverwriteOutput(true);

Config.setCodec("h265");

Config.overrideWebpackConfig(webpackOverride);
