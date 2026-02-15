"use client";

import { ReactNode } from "react";
import Squares from "../bits-ui/Squares";

type Props = {
  children: ReactNode;
};

export default function SquaresLayout({ children }: Props) {
  return (
    <div className="relative min-h-dvh w-full">
      {/* 背景アニメーション */}
      <div className="absolute inset-0">
        <Squares
          speed={0.5}
          direction="diagonal"
          hoverFillColor={"none"}
          squareSize={30}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
