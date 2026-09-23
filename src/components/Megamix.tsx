import { Trainer } from "./CommonTrainer.tsx";
import "./Trainers.css";

function MegamixTrainer() {
  return (
    <>
      <h1>Megamix: all exercises, shuffled!</h1>
      <p>Kanji Trainer</p>
    </>
  );
}

function Settings() {
  return <p>Hi</p>;
}

export function MegamixApp() {
  return (
    <>
      <Trainer exercise={<MegamixTrainer />} settings={<Settings />}></Trainer>
    </>
  );
}
