import "./Topbar.css";
import { NavLink } from "react-router";

export function Topbar() {
  return (
    <div className="nav-wrapper">
      <nav>
        <div>
          <li>
            <NavLink to="/">Kana</NavLink>
          </li>
          <li>
            <NavLink to="/kanji">Kanji</NavLink>
          </li>
          <li>
            <NavLink to="/words-kana">Words (only kana)</NavLink>
          </li>
          <li>
            <NavLink to="/words-kanji">Words (with kanji)</NavLink>
          </li>
          <li>
            <NavLink to="/mix">Megamix</NavLink>
          </li>
        </div>
        <div>
          {/* To-Do Auth */}
          <li>Log in</li>
        </div>
      </nav>
    </div>
  );
}
