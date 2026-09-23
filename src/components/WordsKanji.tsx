import { Trainer } from "./CommonTrainer.tsx";
import "./Trainers.css";

function WordsKanjiTrainer() {
  return (
    <>
      <h1>Words (with kanji)</h1>
      <p>Words trainer</p>
    </>
  );
}

function Settings() {
  return <p>Hi</p>;
}

export function WordsKanji() {
  return (
    <>
      <Trainer
        exercise={<WordsKanjiTrainer />}
        settings={<Settings />}
      ></Trainer>
    </>
  );
}
