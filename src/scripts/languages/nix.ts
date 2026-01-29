import type { MucoLanguage } from '.';


export const nixLanguage: MucoLanguage = {
  id: 'nix',
  name: 'Nix',
  syntax: async () => {
    const { nix } = await import('@replit/codemirror-lang-nix');
    return nix();
  },
  patterns: {
    function: /\b(let|with|rec|inherit|lambda)\b|:\s*$/,
    loop: /\b(map|forEach|genList|foldl'|foldr)\b/,
    conditional: /\b(if|then|else|assert)\b/,
    string: /"([^"\\]|\\.)*"|''[\s\S]*?''/,
    comment: /#.*$|\/\*[\s\S]*?\*\//m,
  },
};

