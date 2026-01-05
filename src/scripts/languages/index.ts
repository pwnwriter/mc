import type { Extension } from '@codemirror/state';

export interface MucoLanguagePatterns {
  function: RegExp;
  loop: RegExp;
  conditional: RegExp;
  string: RegExp;
  comment: RegExp;
}

export interface MucoLanguage {
  id: string;
  name: string;
  syntax: () => Promise<Extension>;
  patterns: MucoLanguagePatterns;
}

export const languageRegistry: MucoLanguage[] = [];

export function registerLanguage(language: MucoLanguage): void {
  languageRegistry.push(language);
}

export function getLanguage(id: string): MucoLanguage | undefined {
  return languageRegistry.find(l => l.id === id);
}

export function detectPattern(code: string, language: MucoLanguage): {
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
import { javascriptLanguage } from './javascript';
import { pythonLanguage } from './python';
import { rustLanguage } from './rust';
import { zigLanguage } from './zig';

registerLanguage(javascriptLanguage);
registerLanguage(pythonLanguage);
registerLanguage(rustLanguage);
registerLanguage(zigLanguage);
