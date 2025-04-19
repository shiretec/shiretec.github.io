"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "./use-color-mode";

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}
