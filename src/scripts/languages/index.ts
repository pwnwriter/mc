import type { Extension } from "@codemirror/state";

export interface McLanguagePatterns {
  function: RegExp;
  loop: RegExp;
  conditional: RegExp;
  string: RegExp;
  comment: RegExp;
}

export interface McLanguage {
  id: string;
  name: string;
  syntax: () => Promise<Extension>;
  patterns: McLanguagePatterns;
}

export const languageRegistry: McLanguage[] = [];

export function registerLanguage(language: McLanguage): void {
  languageRegistry.push(language);
}

export function getLanguage(id: string): McLanguage | undefined {
  return languageRegistry.find((l) => l.id === id);
}

export function detectPattern(
  code: string,
  language: McLanguage,
): {
  hasFunction: boolean;
  hasLoop: boolean;
  hasConditional: boolean;
  hasString: boolean;
  hasComment: boolean;
} {
  return {
    hasFunction: language.patterns.function.test(code),
    hasLoop: language.patterns.loop.test(code),
    hasConditional: language.patterns.conditional.test(code),
    hasString: language.patterns.string.test(code),
    hasComment: language.patterns.comment.test(code),
  };
}

// Import and register languages
import { javascriptLanguage } from "./javascript";
import { pythonLanguage } from "./python";
import { rustLanguage } from "./rust";
import { zigLanguage } from "./zig";
import { nixLanguage } from "./nix";

registerLanguage(javascriptLanguage);
registerLanguage(pythonLanguage);
registerLanguage(rustLanguage);
registerLanguage(zigLanguage);
registerLanguage(nixLanguage);
