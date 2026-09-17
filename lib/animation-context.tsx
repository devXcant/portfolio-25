"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AnimationContextValue {
  skipAnimations: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  skipAnimations: false,
});

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [skipAnimations, setSkipAnimations] = useState(false);

  useEffect(() => {
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setSkipAnimations(prefersReduce);
    document.documentElement.classList.toggle("skip-motion", prefersReduce);
  }, []);

  const value = useMemo(() => ({ skipAnimations }), [skipAnimations]);

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationMode() {
  return useContext(AnimationContext);
}
