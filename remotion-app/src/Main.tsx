import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
  });

  return (
    <AbsoluteFill className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
      <div
        style={{ transform: `scale(${scale})` }}
        className="grid place-items-center h-screen  lg:prose-xl"
      >
        <h1>Hello World!</h1>
      </div>
    </AbsoluteFill>
  );
};
