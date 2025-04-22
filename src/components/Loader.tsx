import React from "react";
import { Loading02Icon } from "hugeicons-react";

const Loader = ({
  fullWidth,
  admin = true,
}: {
  fullWidth?: boolean;
  admin?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full ${
        fullWidth && "md:-ml-64"
      } ${!admin && "bg-OMBpink custom-bg3 md:h-screen-minus-header "}`}
    >
      <Loading02Icon
        className={`animate-spin ${admin ? "text-orange-400" : "text-white"}`}
        width={40}
        height={40}
      />
      <span className={`${admin ? "text-gray-500" : "text-white"}`}>
        Loading...
      </span>
    </div>
  );
};

export default Loader;
