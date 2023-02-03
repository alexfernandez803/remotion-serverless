import { AwsRegion, getRegions } from "@remotion/lambda";

//set to ap-southeast-2
// Adjust to you own use.
export const usedRegions: AwsRegion[] = getRegions().filter(
  (r) => r === "ap-southeast-2"
);

export const getRandomRegion = (): AwsRegion => {
  return usedRegions[Math.floor(Math.random() * usedRegions.length)];
};
