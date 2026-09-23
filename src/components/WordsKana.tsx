import { Trainer } from "./CommonTrainer.tsx";
import "./Trainers.css";

function WordsKanaTrainer() {
  return (
    <>
      <h1>Words (only kana)</h1>
      <p>Words trainer</p>
    </>
  );
}

function Settings() {
  return <p>Hi</p>;
}

export function WordsKana() {
  return (
    <>
      <Trainer
        exercise={<WordsKanaTrainer />}
        settings={<Settings />}
      ></Trainer>
    </>
  );
}
