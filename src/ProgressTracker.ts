export type ScoreType = "kana" | "kanji" | "wordsKana" | "wordsKanji" | "megamix";

export class ProgressTracker {
  lastActivity: Date = new Date("1970/1/1"); // set to today on 1st input of every form
  streakCounter: number = 0;      // updated with ^ by just adding +1
  longestStreak: number = 0;
  // below should be updated at the end of each relevant form
  bestScore: Record<ScoreType, number> = {
     kana: -1, kanji: -1, wordsKana: -1, wordsKanji: -1, megamix: -1,
  };

  private listeners = new Set<() => void>();
  private saveTimer: number | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem("savedProgress");
      if (saved) {
        const data = JSON.parse(saved);
        this.lastActivity = new Date(data.lastActivity);
        this.streakCounter = data.streakCounter ?? 0;
        this.longestStreak = data.longestStreak ?? 0;
        this.bestScore = { ...this.bestScore, ...data.bestScore };
      }
    } catch {
      // corrupted JSON?? fall back to default "this" values
    }
    console.log(this)
    return this;
  }

  returnStreakCounter() {
    return this.streakCounter;
  }

  // called VVV this VVV from components whenever progress must be updated
  update() {
    function startOfDay(d: Date): Date {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    // decide on what to do with the streak
    const today = startOfDay(new Date());
    const last = startOfDay(this.lastActivity);
    const dayMs = 86_400_000; // milliseconds in a day

    const daysBetween = Math.round((today.getTime() - last.getTime()) / dayMs);

    if (daysBetween === 1) {
      // if last activity yesterday, streak goes on
      this.streakCounter += 1;
    } else if (daysBetween > 1) {
      // last activity over a day ago, streak breaks
      this.streakCounter = 1;
    }
    // daysBetween === 0 - last activity today, change nothing

    if (this.streakCounter > this.longestStreak) {
      this.longestStreak = this.streakCounter;
    }

    this.lastActivity = new Date();
    this.scheduleSave();
    this.listeners.forEach((l) => l());
    console.log(this.lastActivity, this.streakCounter);
  }

  recordScore(key: ScoreType, score: number) {
    if (score > this.bestScore[key]) this.bestScore[key] = score;
    this.update();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private scheduleSave() {
    if (this.saveTimer !== null) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.save(), 800) as unknown as number;
  }

  private save() {
    this.saveTimer = null;
    localStorage.setItem("savedProgress", JSON.stringify({
      lastActivity: this.lastActivity,
      streakCounter: this.streakCounter,
      longestStreak: this.longestStreak,
      bestScore: this.bestScore,
    }));
  }

  // call at app startup
  flush() {
    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer);
      this.save();
    }
  }

}

// app-wide singleton
export const progress = new ProgressTracker();
