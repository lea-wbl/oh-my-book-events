import React from "react";
import { Loading02Icon } from "hugeicons-react";

const Loader = ({ fullWidth }: { fullWidth?: boolean }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full ${
        fullWidth && "md:-ml-64"
      }`}
    >
      <Loading02Icon
        className="animate-spin text-orange-400"
        width={40}
        height={40}
      />
      <span className="text-gray-500">Loading...</span>
    </div>
  );
};

export default Loader;
