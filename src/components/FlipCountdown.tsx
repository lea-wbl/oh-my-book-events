import { useCountdown } from "../hooks/useCountdown";
import TimeValueWrapper from "./TimeValueWrapper";

function addLeadingZero(val: number) {
  const valStr = val.toString();
  if (valStr.length === 1) {
    return "0" + valStr;
  } else {
    return valStr;
  }
}

export default function FlipCountdown() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div className="containerAAAh">
      <TimeValueWrapper timeValue={addLeadingZero(days)} label="days" />
      <TimeValueWrapper timeValue={addLeadingZero(hours)} label="hours" />
      <TimeValueWrapper timeValue={addLeadingZero(minutes)} label="minutes" />
      <TimeValueWrapper timeValue={addLeadingZero(seconds)} label="seconds" />
    </div>
  );
}
