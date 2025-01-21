import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

type Props = {
  label: string;
  timeValue: string;
};

function TimeValueWrapper({ label, timeValue }: Props) {
  const [previousValue, setPreviousValue] = useState(timeValue);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = () => {
    overlayRef.current?.classList.remove("flip");
    setPreviousValue(timeValue);
  };

  useLayoutEffect(() => {
    if (previousValue !== timeValue) {
      overlayRef.current?.classList.add("flip");
    }
  }, [timeValue, previousValue]);

  return (
    <div className="containerBloop">
      <div className="time-container">
        <div className="top">{timeValue}</div>
        <div className="bottom">{previousValue}</div>
        <div className="overlay" ref={overlayRef}>
          <div className="overlay-top" onAnimationEnd={handleAnimationEnd}>
            {previousValue}
          </div>
          <div className="overlay-bottom">{timeValue}</div>
        </div>
      </div>
      <p className="label">{label}</p>
    </div>
  );
}

export default React.memo(TimeValueWrapper);
