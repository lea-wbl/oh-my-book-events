import React, { Dispatch, SetStateAction } from "react";
import styles from "./BurgerMenuBtn.module.css";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenuBtn = ({ open, setOpen }: IProps) => {
  return (
    <div
      className={`${styles.burgerIcon} ${open ? styles.open : ""} md:hidden`}
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
