import { Trainer } from "./CommonTrainer.tsx";
import "./Trainers.css";

function KanjiTrainer() {
  return (
    <>
      <h1>Kanji</h1>
      <p>Kanji Trainer</p>
    </>
  );
}

function Settings() {
  return <p>Hi</p>;
}

export function KanjiApp() {
  return (
    <>
      <Trainer exercise={<KanjiTrainer />} settings={<Settings />}></Trainer>
    </>
  );
}
