import type { MucoLanguage } from './index';

export const javascriptLanguage: MucoLanguage = {
  id: 'javascript',
  name: 'JavaScript',
  syntax: async () => {
    const { javascript } = await import('@codemirror/lang-javascript');
    return javascript({ jsx: true, typescript: true });
  },
  patterns: {
    function: /\b(function|const\s+\w+\s*=\s*(?:async\s*)?\(|=>\s*{?|\bclass\b)/,
    loop: /\b(for|while|do)\s*\(/,
    conditional: /\b(if|else|switch|case|\?.*:)/,
    string: /(['"`])(?:(?!\1)[^\\]|\\.)*\1/,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//m,
  },
};
