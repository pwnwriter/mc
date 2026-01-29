import type { McLanguage } from './index';

export const rustLanguage: McLanguage = {
  id: 'rust',
  name: 'Rust',
  syntax: async () => {
    const { rust } = await import('@codemirror/lang-rust');
    return rust();
  },
  patterns: {
    function: /\b(fn|impl|struct|enum|trait|mod)\b/,
    loop: /\b(for|while|loop)\b/,
    conditional: /\b(if|else|match)\b/,
    string: /"(?:[^"\\]|\\.)*"|r#*"[\s\S]*?"#*/,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//m,
  },
};
