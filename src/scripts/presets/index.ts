import { javascriptPreset } from "./javascript";
import { nixPreset } from "./nix";
import { pythonPreset } from "./python";
import { rustPreset } from "./rust";
import { zigPreset } from "./zig";

const presets: Record<string, string> = {
  javascript: javascriptPreset,
  python: pythonPreset,
  rust: rustPreset,
  zig: zigPreset,
  nix: nixPreset,
};

export function getPreset(languageId: string): string {
  return presets[languageId] || javascriptPreset;
}

export { javascriptPreset, pythonPreset, rustPreset, zigPreset };
