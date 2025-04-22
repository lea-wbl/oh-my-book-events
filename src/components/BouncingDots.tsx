import React from "react";

const BouncingDots = () => {
  return (
    <div className="flex gap-1 text-2xl font-bold -ml-2">
      <span className="animate-bounce" style={{ animationDelay: "0s" }}>
        .
      </span>
      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
        .
      </span>
      <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
        .
      </span>
    </div>
  );
};

export default BouncingDots;
