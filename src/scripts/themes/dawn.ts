import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import type { McTheme } from './index';

const colors = {
  bg: '#faf4ed',
  bgSecondary: '#fffaf3',
  fg: '#575279',
  fgMuted: '#9893a5',
  accent: '#907aa9',
  border: '#dfdad9',
  keyword: '#b4637a',
  string: '#ea9d34',
  comment: '#9893a5',
  function: '#d7827e',
  variable: '#286983',
  number: '#56949f',
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
    backgroundColor: '#dfdad9',
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

export const dawnTheme: McTheme = {
  id: 'dawn',
  name: 'Dawn',
  group: 'Mc',
  editor: [editorTheme, syntaxHighlighting(highlightStyle)],
  music: {
    scale: ['D4', 'E4', 'F#4', 'A4', 'B4', 'D5', 'E5', 'F#5'],
    attack: 0.05,
    release: 1.0,
    reverb: 0.5,
    filter: 3000,
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
