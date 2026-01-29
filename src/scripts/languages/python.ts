import type { McLanguage } from "./index";

export const pythonLanguage: McLanguage = {
  id: "python",
  name: "Python",
  syntax: async () => {
    const { python } = await import("@codemirror/lang-python");
    return python();
  },
  patterns: {
    function: /\b(def|class|lambda)\b/,
    loop: /\b(for|while)\b.*:/,
    conditional: /\b(if|elif|else)\b.*:/,
    string: /(['"])(?:(?!\1)[^\\]|\\.)*\1|'''[\s\S]*?'''|"""[\s\S]*?"""/,
    comment: /#.*$/m,
  },
};
