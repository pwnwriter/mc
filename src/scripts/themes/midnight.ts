import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import type { MucoTheme } from './index';

const colors = {
  bg: '#0d1117',
  bgSecondary: '#161b22',
  fg: '#c9d1d9',
  fgMuted: '#8b949e',
  accent: '#58a6ff',
  border: '#30363d',
  keyword: '#ff7b72',
  string: '#a5d6ff',
  comment: '#8b949e',
  function: '#d2a8ff',
  variable: '#ffa657',
  number: '#79c0ff',
};

const editorTheme = EditorView.theme({
  '&': {
    backgroundColor: colors.bg,
    color: colors.fg,
  },
  '.cm-content': {
    caretColor: colors.accent,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: colors.accent,
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: '#264f78',
  },
  '.cm-gutters': {
    backgroundColor: colors.bg,
    color: colors.fgMuted,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: colors.bgSecondary,
  },
  '.cm-activeLine': {
    backgroundColor: colors.bgSecondary,
  },
});

const highlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: colors.keyword },
  { tag: tags.operator, color: colors.keyword },
  { tag: tags.variableName, color: colors.fg },
  { tag: tags.function(tags.variableName), color: colors.function },
  { tag: tags.definition(tags.variableName), color: colors.variable },
  { tag: tags.string, color: colors.string },
  { tag: tags.comment, color: colors.comment, fontStyle: 'italic' },
  { tag: tags.number, color: colors.number },
  { tag: tags.bool, color: colors.keyword },
  { tag: tags.null, color: colors.keyword },
  { tag: tags.className, color: colors.variable },
  { tag: tags.typeName, color: colors.variable },
  { tag: tags.propertyName, color: colors.accent },
  { tag: tags.punctuation, color: colors.fgMuted },
]);

export const midnightTheme: MucoTheme = {
  id: 'midnight',
  name: 'Midnight',
  group: 'Muco',
  editor: [editorTheme, syntaxHighlighting(highlightStyle)],
  music: {
    scale: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'],
    attack: 0.02,
    release: 0.8,
    reverb: 0.6,
    filter: 2000,
  },
  colors: {
    bgPrimary: colors.bg,
    bgSecondary: colors.bgSecondary,
    textPrimary: colors.fg,
    textSecondary: colors.fgMuted,
    accent: colors.accent,
    border: colors.border,
  },
};
