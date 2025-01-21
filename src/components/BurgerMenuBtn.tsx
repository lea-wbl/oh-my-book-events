import React, { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenuBtn = ({ open, setOpen }: IProps) => {
  return (
    <div
      id="nav-icon3"
      className={`${open && "open"} md:hidden`}
      onClick={() => setOpen(!open)}
    >
      <span className="bg-red-200"></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerMenuBtn;
