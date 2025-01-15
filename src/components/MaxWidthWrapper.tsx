import React, { ReactNode } from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-6 md:px-12 py-8 md:py-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
