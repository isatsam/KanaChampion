import { useProgress } from "../ProgressContext.tsx";
import { Trainer } from "./CommonTrainer.tsx";
import "./Trainers.css";

function ProgressTab() {
  const progress = useProgress();

  return (
    <>
      <h1>Your progress</h1>
      <p>Current streak: {progress.streakCounter}</p>
      <p>Your longest streak: {progress.longestStreak}</p>
      { /* <p>Best kana score: {progress.bestScore.kana}</p> */ }
      <p>
        Last active:{" "}
        {progress.lastActivity.toLocaleDateString("en-IE", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p>Fight on!</p>
    </>
  );
}

function Settings() {
  return <p>Hi</p>;
}

export function ProgressView() {
  return (
    <>
      <Trainer exercise={<ProgressTab />} settings={<Settings />}></Trainer>
    </>
  );
}
