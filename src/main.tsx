import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Topbar } from "./components/Topbar";
import { BrowserRouter, Routes, Route } from "react-router";
import { KanjiApp } from "./components/KanjiTrainer.tsx";
import { WordsKana } from "./components/WordsKana.tsx";
import { WordsKanji } from "./components/WordsKanji.tsx";
import { MegamixApp } from "./components/Megamix.tsx";
import { ProgressView } from "./components/ProgressView.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Topbar />
      <div className="wrapper">
        <main>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/kanji" element={<KanjiApp />} />
            <Route path="/words-kana" element={<WordsKana />} />
            <Route path="/words-kanji" element={<WordsKanji />} />
            <Route path="/mix" element={<MegamixApp />} />
            <Route path="/progress" element={<ProgressView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>,
);
