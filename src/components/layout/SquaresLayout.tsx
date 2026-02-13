"use client";

import { ReactNode } from "react";
import Squares from "../bits-ui/Squares";

type Props = {
  children: ReactNode;
};

export default function SquaresLayout({ children }: Props) {
  return (
    <div className="relative h-dvh w-dvw">
      {/* 背景アニメーション */}
      <div className="absolute size-full">
        <Squares
          speed={0.5}
          direction="diagonal"
          hoverFillColor={"none"}
          squareSize={30}
        />
      </div>
      <div className="absolute size-full">{children}</div>
    </div>
  );
}
