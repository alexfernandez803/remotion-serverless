import React from "react";
import { Composition } from "remotion";
import { COMP_NAME } from "./config";
import { Main } from "./Main";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        component={Main}
        durationInFrames={1200}
        fps={30}
        height={1080}
        width={1920}
        id={COMP_NAME}
        defaultProps={{ text: "Hello World" }}
      ></Composition>
    </>
  );
};
