import React, { useEffect } from "react";
import { useCallback } from "react";

import { useInterval } from "../hooks/use-interval";
import { secondsToMinutes } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Timer } from "./timer";

interface IProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: IProps): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = React.useState(
    new Array(props.cycles - 1).fill(true)
  );
  const [completedCycles, setCompletedCycles] = React.useState(0);
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  }, [props.pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [props.longRestTime, props.shortRestTime]
  );

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);

    if (resting) configureWork();
  }, [
    completedCycles,
    configureRest,
    configureWork,
    cyclesQtdManager,
    mainTime,
    numberOfPomodoros,
    props.cycles,
    resting,
    working,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? "Trabalhando" : "Descansando"}</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />

        <Button text="Rest" onClick={() => configureRest(false)} />

        <Button
          className={!working && !resting ? "hidden" : ""}
          text={timeCounting ? "Pause" : "Play"}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className="details">
        <p>Ciclos concluidos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToMinutes(fullWorkingTime)}</p>
        <p>Pomodoros concluidos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
