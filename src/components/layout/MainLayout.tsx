"use client";

import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import SquaresLayout from "./SquaresLayout";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <SquaresLayout>
      <div className="size-full grid grid-rows-[auto_1fr_auto]">
        <Header />
        {children}
        <Footer />
      </div>
    </SquaresLayout>
  );
}
