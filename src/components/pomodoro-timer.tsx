import React from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToTime } from "../utils/seconds-to-time";

interface IProps {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <div>Olá mundo {secondsToTime(mainTime)}!</div>;
}
