import type { McLanguage } from "./index";

export const zigLanguage: McLanguage = {
  id: "zig",
  name: "Zig",
  syntax: async () => {
    // Zig doesn't have official CodeMirror support, use a basic setup
    const { StreamLanguage } = await import("@codemirror/language");
    const { simpleMode } =
      await import("@codemirror/legacy-modes/mode/simple-mode");

    const zigMode = simpleMode({
      start: [
        { regex: /\/\/.*/, token: "comment" },
        { regex: /"(?:[^"\\]|\\.)*"/, token: "string" },
        { regex: /'(?:[^'\\]|\\.)*'/, token: "string" },
        {
          regex:
            /\b(fn|pub|const|var|struct|enum|union|error|test|comptime|inline|extern|export|return|if|else|while|for|switch|break|continue|defer|errdefer|catch|try|orelse|and|or|undefined|null|true|false)\b/,
          token: "keyword",
        },
        {
          regex:
            /\b(i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|f16|f32|f64|bool|void|noreturn|type|anytype|anyerror|usize|isize)\b/,
          token: "type",
        },
        { regex: /\b0x[0-9a-fA-F_]+\b/, token: "number" },
        { regex: /\b0b[01_]+\b/, token: "number" },
        { regex: /\b0o[0-7_]+\b/, token: "number" },
        {
          regex: /\b[0-9][0-9_]*(?:\.[0-9_]+)?(?:[eE][+-]?[0-9_]+)?\b/,
          token: "number",
        },
        { regex: /[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/, token: "function" },
        { regex: /@[a-zA-Z_][a-zA-Z0-9_]*/, token: "builtin" },
        { regex: /[+\-*/%=<>!&|^~?:]+/, token: "operator" },
      ],
    });

    return StreamLanguage.define(zigMode);
  },
  patterns: {
    function: /\b(fn|pub\s+fn|struct|enum|union)\b/,
    loop: /\b(while|for)\b/,
    conditional: /\b(if|else|switch)\b/,
    string: /"(?:[^"\\]|\\.)*"/,
    comment: /\/\/.*$/m,
  },
};
