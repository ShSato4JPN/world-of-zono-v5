import { ReactNode } from "react";

type Props = {
  mobile: ReactNode;
  tablet?: ReactNode;
  pc: ReactNode;
};

export default function DeviceSwitcher({ mobile, tablet, pc }: Props) {
  return (
    <>
      <div className="md:hidden">{mobile}</div>
      {tablet && <div className="hidden md:block lg:hidden">{tablet}</div>}
      <div className="hidden lg:block">{pc}</div>
    </>
  );
}
