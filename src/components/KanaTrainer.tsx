import { createContext, useContext, useState } from "react";
import { Trainer } from "./CommonTrainer.tsx";
import "./Trainers.css";
import "./KanaTrainer.css";
import { useProgress } from "../ProgressContext.tsx"

class SolutionArray {
  type: string;
  arr: { kana: string; romaji: string }[];

  constructor() {
    this.type = "hiragana";
    this.arr = HIRAGANA.arr;
  }
}

const HIRAGANA: SolutionArray = {
  type: "hiragana",
  arr: [
    { kana: "あ", romaji: "a" },
    { kana: "い", romaji: "i" },
    { kana: "う", romaji: "u" },
    { kana: "え", romaji: "e" },
    { kana: "お", romaji: "o" },
    { kana: "か", romaji: "ka" },
    { kana: "き", romaji: "ki" },
    { kana: "く", romaji: "ku" },
    { kana: "け", romaji: "ke" },
    { kana: "こ", romaji: "ko" },
    { kana: "さ", romaji: "sa" },
    { kana: "し", romaji: "shi" },
    { kana: "す", romaji: "su" },
    { kana: "せ", romaji: "se" },
    { kana: "そ", romaji: "so" },
    { kana: "た", romaji: "ta" },
    { kana: "ち", romaji: "chi" },
    { kana: "つ", romaji: "tsu" },
    { kana: "て", romaji: "te" },
    { kana: "と", romaji: "to" },
    { kana: "な", romaji: "na" },
    { kana: "に", romaji: "ni" },
    { kana: "ぬ", romaji: "nu" },
    { kana: "ね", romaji: "ne" },
    { kana: "の", romaji: "no" },
    { kana: "は", romaji: "ha" },
    { kana: "ひ", romaji: "hi" },
    { kana: "ふ", romaji: "fu" },
    { kana: "へ", romaji: "he" },
    { kana: "ほ", romaji: "ho" },
    { kana: "ま", romaji: "ma" },
    { kana: "み", romaji: "mi" },
    { kana: "む", romaji: "mu" },
    { kana: "め", romaji: "me" },
    { kana: "も", romaji: "mo" },
    { kana: "ら", romaji: "ra" },
    { kana: "り", romaji: "ri" },
    { kana: "る", romaji: "ru" },
    { kana: "れ", romaji: "re" },
    { kana: "ろ", romaji: "ro" },
    { kana: "や", romaji: "ya" },
    { kana: "ゆ", romaji: "yu" },
    { kana: "よ", romaji: "yo" },
    { kana: "わ", romaji: "wa" },
    { kana: "を", romaji: "wo" },
    { kana: "ん", romaji: "n" },
  ],
};
const KATAKANA: SolutionArray = {
  type: "katakana",
  arr: [
    { kana: "ア", romaji: "a" },
    { kana: "イ", romaji: "i" },
    { kana: "ウ", romaji: "u" },
    { kana: "エ", romaji: "e" },
    { kana: "オ", romaji: "o" },
    { kana: "カ", romaji: "ka" },
    { kana: "キ", romaji: "ki" },
    { kana: "ク", romaji: "ku" },
    { kana: "ケ", romaji: "ke" },
    { kana: "コ", romaji: "ko" },
    { kana: "サ", romaji: "sa" },
    { kana: "シ", romaji: "shi" },
    { kana: "ス", romaji: "su" },
    { kana: "セ", romaji: "se" },
    { kana: "ソ", romaji: "so" },
    { kana: "タ", romaji: "ta" },
    { kana: "チ", romaji: "chi" },
    { kana: "ツ", romaji: "tsu" },
    { kana: "テ", romaji: "te" },
    { kana: "ト", romaji: "to" },
    { kana: "ナ", romaji: "na" },
    { kana: "ニ", romaji: "ni" },
    { kana: "ヌ", romaji: "nu" },
    { kana: "ネ", romaji: "ne" },
    { kana: "ノ", romaji: "no" },
    { kana: "ハ", romaji: "ha" },
    { kana: "ヒ", romaji: "hi" },
    { kana: "フ", romaji: "fu" },
    { kana: "ヘ", romaji: "he" },
    { kana: "ホ", romaji: "ho" },
    { kana: "マ", romaji: "ma" },
    { kana: "ミ", romaji: "mi" },
    { kana: "ム", romaji: "mu" },
    { kana: "メ", romaji: "me" },
    { kana: "モ", romaji: "mo" },
    { kana: "ラ", romaji: "ra" },
    { kana: "リ", romaji: "ri" },
    { kana: "ル", romaji: "ru" },
    { kana: "レ", romaji: "re" },
    { kana: "ロ", romaji: "ro" },
    { kana: "ヤ", romaji: "ya" },
    { kana: "ユ", romaji: "yu" },
    { kana: "ヨ", romaji: "yo" },
    { kana: "ワ", romaji: "wa" },
    { kana: "ヲ", romaji: "wo" },
    { kana: "ん", romaji: "n" },
  ],
};
const BOTH: SolutionArray = {
  type: "both",
  arr: [...HIRAGANA.arr, ...KATAKANA.arr],
};

function KanaDisplay() {
  const { currentArray, currentIndex } = useContext(ArrayContext);
  return (
    <p id="kanaDisplay" className="kana-display">
      {currentArray.arr[currentIndex].kana}
    </p>
  );
}

function KanaForm() {
  const {
    currentArray,
    setCurrentArray,
    currentIndex,
    setCurrentIndex,
    answerVisible,
    setAnswerVisibility,
    nextKanaMethod,
    setNextKanaMethod,
  } = useContext(ArrayContext);
  const { currentSuccess, setSuccess, totalToSuccess, setTotalToSuccess } =
    useContext(SuccessContext);

  // +1 to the daily streak
  const progress = useProgress();

  const answer = currentArray.arr[currentIndex].romaji;

  const [kanaInput, setKanaInput] = useState("");

  function getNextKana() {
    switch (nextKanaMethod) {
      case "random":
        currentArray.arr.splice(currentIndex, 1);
        setCurrentIndex(Math.floor(Math.random() * currentArray.arr.length));
        break;
      case "normal":
        setCurrentIndex(currentIndex + 1);
        break;
      case "reverse":
        setCurrentIndex(currentIndex - 1);
        break;
    }
  }

  function resetAfterWin() {
    const newArr = new SolutionArray();
    newArr.type = currentArray.type;
    switch (currentArray.type) {
      case "hiragana":
        newArr.arr = HIRAGANA.arr;
        break;
      case "katakana":
        newArr.arr = KATAKANA.arr;
        break;
      case "both":
        newArr.arr = BOTH.arr;
        break;
    }
    switch (nextKanaMethod) {
      case "random":
        setNextKanaMethod("random");
        setCurrentIndex(Math.floor(Math.random() * newArr.arr.length));
        break;
      case "normal":
        setNextKanaMethod("normal");
        setCurrentIndex(0);
        break;
      case "reverse":
        setNextKanaMethod("reverse");
        setCurrentIndex(newArr.arr.length - 1);
        break;
      default:
        setNextKanaMethod("random");
    }
    setSuccess(0);
    const winAnnounced = document.getElementById("winAnnounced");
    if (winAnnounced) {
      winAnnounced.style = "inline-block";
    }
    setCurrentArray(newArr);
    setTotalToSuccess(newArr.arr.length);
  }

  return (
    <form
      className="kana-form"
      autoComplete="off"
      onChange={(e) => {
        if ((e.target as HTMLInputElement).value === " ") {
          setAnswerVisibility(true);
        }

        if (answerVisible) {
          getNextKana();
          setKanaInput("");
          setAnswerVisibility(false);
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const winAnnounced = document.getElementById("winAnnounced");
        if (winAnnounced && winAnnounced.style.display != "none") {
          winAnnounced.style.display = "none";
        }

        if (kanaInput.trim() == answer || answerVisible) {
          progress.update();
          getNextKana();
          setKanaInput("");
          setAnswerVisibility(false);
          if (!answerVisible) {
            setSuccess(currentSuccess + 1);
          }
        }

        if (
          currentArray.arr.length == 0 ||
          currentIndex == -1 ||
          currentIndex == currentArray.arr.length + 1
        ) {
          resetAfterWin();
          return;
        }
      }}
    >
      <input
        type="text"
        id="kanaInputField"
        name="kanaInputField"
        value={kanaInput}
        maxLength={3}
        onChange={(e) => {
          setKanaInput(e.target.value);
        }}
      />
      <label htmlFor="kanaInputField">
        Enter the corresponding romaji.
        <br />
        Press Space to reveal answer.
        <br />
        {currentSuccess} out of {totalToSuccess}
        <br />
        <span id="winAnnounced" style={{ display: "none", fontWeight: 600 }}>
          Got {currentArray.arr.length} correctly, congratulations!
        </span>
        <br />
        Your daily streak: {progress.returnStreakCounter()}. Let's go!
      </label>
    </form>
  );
}

function AnswerReveal() {
  const { currentArray, currentIndex, answerVisible } =
    useContext(ArrayContext);

  return (
    <div className="answerContainer">
      <p
        style={{
          display: answerVisible === true ? "block" : "none",
          margin: 0,
        }}
      >
        {currentArray.arr[currentIndex].romaji}
      </p>
    </div>
  );
}

function KanaTrainer() {
  return (
    <>
      <div className="container">
        <KanaDisplay />
        <AnswerReveal />
        <KanaForm />
      </div>
    </>
  );
}

function SettingsCurrentArray() {
  const { currentArray, setCurrentArray, setCurrentIndex } =
    useContext(ArrayContext);
  const { setSuccess, setTotalToSuccess } = useContext(SuccessContext);

  function changeArray(el: HTMLInputElement) {
    switch (el.value) {
      case "hiragana":
        setCurrentArray(structuredClone(HIRAGANA));
        setCurrentIndex(0);
        setSuccess(0);
        setTotalToSuccess(HIRAGANA.arr.length);
        break;
      case "katakana":
        setCurrentArray(structuredClone(KATAKANA));
        setCurrentIndex(0);
        setSuccess(0);
        setTotalToSuccess(KATAKANA.arr.length);
        break;
      case "both":
        setCurrentArray(structuredClone(BOTH));
        setCurrentIndex(0);
        setSuccess(0);
        setTotalToSuccess(BOTH.arr.length);
        break;
      default:
        setCurrentArray(structuredClone(HIRAGANA));
        setCurrentIndex(0);
        setSuccess(0);
        setTotalToSuccess(HIRAGANA.arr.length);
    }
  }
  return (
    <>
      <div className="settings-options">
        <label>
          <input
            type="radio"
            name="kanaType"
            value="hiragana"
            onChange={(e) => {
              return e.target.checked && changeArray(e.target);
            }}
            checked={currentArray.type == "hiragana" && true}
          />
          Hiragana (ひ)
        </label>
        <label>
          <input
            type="radio"
            name="kanaType"
            value="katakana"
            onChange={(e) => {
              return e.target.checked && changeArray(e.target);
            }}
            checked={currentArray.type == "katakana" && true}
          />
          Katakana (カ)
        </label>
        <label>
          <input
            type="radio"
            name="kanaType"
            value="both"
            onChange={(e) => {
              return e.target.checked && changeArray(e.target);
            }}
            checked={currentArray.type == "both" && true}
          />
          Both (ひ + カ)
        </label>
      </div>
    </>
  );
}

function SettingsNextKanaMethod() {
  const {
    currentArray,
    setCurrentArray,
    setCurrentIndex,
    nextKanaMethod,
    setNextKanaMethod,
  } = useContext(ArrayContext);
  const { setSuccess, setTotalToSuccess } = useContext(SuccessContext);

  function resetArray() {
    switch (currentArray.type) {
      case "hiragana":
        setCurrentArray(structuredClone(HIRAGANA));
        setTotalToSuccess(HIRAGANA.arr.length);
        break;
      case "katakana":
        setCurrentArray(structuredClone(KATAKANA));
        setTotalToSuccess(KATAKANA.arr.length);
        break;
      case "both":
        setCurrentArray(structuredClone(BOTH));
        setTotalToSuccess(BOTH.arr.length);
        break;
    }
    setSuccess(0);
  }

  function changeArray(el: HTMLInputElement) {
    switch (el.value) {
      case "random":
        setNextKanaMethod("random");
        resetArray();
        setCurrentIndex(Math.floor(Math.random() * currentArray.arr.length));
        break;
      case "normal":
        setNextKanaMethod("normal");
        resetArray();
        setCurrentIndex(0);
        break;
      case "reverse":
        setNextKanaMethod("reverse");
        resetArray();
        setCurrentIndex(currentArray.arr.length - 1);
        break;
      default:
        setNextKanaMethod("random");
        resetArray();
    }
  }
  return (
    <>
      <div className="settings-options">
        <label>
          <input
            type="radio"
            name="kanaMethodType"
            value="random"
            onChange={(e) => {
              return e.target.checked && changeArray(e.target);
            }}
            checked={nextKanaMethod == "random" && true}
          />
          Random (ひ, ら, か...)
        </label>
        <label>
          <input
            type="radio"
            name="kanaMethodType"
            value="normal"
            onChange={(e) => {
              return e.target.checked && changeArray(e.target);
            }}
            checked={nextKanaMethod == "normal" && true}
          />
          Normal (あ, い, う...)
        </label>
        <label>
          <input
            type="radio"
            name="kanaMethodType"
            value="reverse"
            onChange={(e) => {
              return e.target.checked && changeArray(e.target);
            }}
            checked={nextKanaMethod == "reverse" && true}
          />
          Reverse (ん, を, わ...)
        </label>
      </div>
    </>
  );
}

function Settings() {
  return (
    <>
      <div className="settings-block">
        <span className="settings-title">Syllaby type:</span>{" "}
        <SettingsCurrentArray />
      </div>
      <div className="settings-block">
        <span className="settings-title">Order:</span>{" "}
        <SettingsNextKanaMethod />
      </div>
    </>
  );
}

const ArrayContext = createContext({
  currentArray: structuredClone(HIRAGANA),
  setCurrentArray: (_: SolutionArray) => {},
  currentIndex: 0,
  setCurrentIndex: (_: number) => {},
  nextKanaMethod: "random",
  setNextKanaMethod: (_: string) => {},
  answerVisible: false,
  setAnswerVisibility: (_: boolean) => {},
});

const SuccessContext = createContext({
  currentSuccess: 0,
  setSuccess: (_: number) => {},
  totalToSuccess: 0,
  setTotalToSuccess: (_: number) => {},
});

export function KanaApp() {
  const [arr, updateArray] = useState(structuredClone(HIRAGANA));
  const [i, setNewIndex] = useState(
    Math.floor(Math.random() * HIRAGANA.arr.length),
  );
  const [kanaMethod, setKanaMethod] = useState("random");
  const [answerVisible, setAnswerVisible] = useState(false);
  const arrayProviderValue = {
    currentArray: arr,
    setCurrentArray: updateArray,
    currentIndex: i,
    setCurrentIndex: setNewIndex,
    nextKanaMethod: kanaMethod,
    setNextKanaMethod: setKanaMethod,
    answerVisible: answerVisible,
    setAnswerVisibility: setAnswerVisible,
  };

  const [success, setSuccess] = useState(0);
  const [totalToSuccess, setTotalToSuccess] = useState(arr.arr.length);
  const successProviderValue = {
    currentSuccess: success,
    setSuccess: setSuccess,
    totalToSuccess: totalToSuccess,
    setTotalToSuccess: setTotalToSuccess,
  };

  return (
    <>
      <ArrayContext.Provider value={arrayProviderValue}>
        <SuccessContext.Provider value={successProviderValue}>
          <Trainer exercise={<KanaTrainer />} settings={<Settings />} />
        </SuccessContext.Provider>
      </ArrayContext.Provider>
    </>
  );
}
