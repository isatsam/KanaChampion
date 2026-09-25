// ProgressContext.tsx
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { progress, ProgressTracker } from "./ProgressTracker";

const ProgressContext = createContext<ProgressTracker>(progress);

export function ProgressProvider({ children }: { children: ReactNode }) {
  return (
    <ProgressContext.Provider value={ progress }>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const tracker = useContext(ProgressContext);
  // Re-render this component whenever .update() fires.
  useSyncExternalStore(
    (cb) => tracker.subscribe(cb),
    () => JSON.stringify(tracker.bestScore) + tracker.streakCounter,
  );
  return tracker;
}
