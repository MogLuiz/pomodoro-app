import React from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";

interface IProps {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Button text="teste" />
    </div>
  );
}
