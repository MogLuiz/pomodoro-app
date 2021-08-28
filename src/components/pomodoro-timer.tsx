import React from "react";
import { useInterval } from "../hooks/use-interval";

interface IProps {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <div>Olá mundo {mainTime}!</div>;
}
