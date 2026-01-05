import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import type { MucoTheme } from './index';

// Rosé Pine (Main)
const main = {
  bg: '#191724',
  bgSecondary: '#1f1d2e',
  fg: '#e0def4',
  fgMuted: '#908caa',
  accent: '#c4a7e7',
  border: '#26233a',
  keyword: '#31748f',
  string: '#f6c177',
  comment: '#6e6a86',
  function: '#ebbcba',
  variable: '#9ccfd8',
  number: '#eb6f92',
};

const mainEditorTheme = EditorView.theme({
  '&': { backgroundColor: main.bg, color: main.fg },
  '.cm-content': { caretColor: main.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: main.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#26233a' },
  '.cm-gutters': { backgroundColor: main.bg, color: main.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: main.bgSecondary },
  '.cm-activeLine': { backgroundColor: main.bgSecondary },
});

const mainHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: main.keyword },
  { tag: tags.operator, color: main.keyword },
  { tag: tags.variableName, color: main.fg },
  { tag: tags.function(tags.variableName), color: main.function },
  { tag: tags.definition(tags.variableName), color: main.variable },
  { tag: tags.string, color: main.string },
  { tag: tags.comment, color: main.comment, fontStyle: 'italic' },
  { tag: tags.number, color: main.number },
  { tag: tags.bool, color: main.keyword },
  { tag: tags.null, color: main.keyword },
  { tag: tags.className, color: main.variable },
  { tag: tags.typeName, color: main.variable },
  { tag: tags.propertyName, color: main.accent },
  { tag: tags.punctuation, color: main.fgMuted },
]);

export const rosePineTheme: MucoTheme = {
  id: 'rosepine',
  name: 'Rosé Pine',
  group: 'Rosé Pine',
  editor: [mainEditorTheme, syntaxHighlighting(mainHighlight)],
  music: {
    scale: ['D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5'],
    attack: 0.03,
    release: 1.1,
    reverb: 0.7,
    filter: 1600,
  },
  colors: {
    bgPrimary: main.bg,
    bgSecondary: main.bgSecondary,
    textPrimary: main.fg,
    textSecondary: main.fgMuted,
    accent: main.accent,
    border: main.border,
  },
};

// Rosé Pine Moon
const moon = {
  bg: '#232136',
  bgSecondary: '#2a273f',
  fg: '#e0def4',
  fgMuted: '#908caa',
  accent: '#c4a7e7',
  border: '#393552',
  keyword: '#3e8fb0',
  string: '#f6c177',
  comment: '#6e6a86',
  function: '#ea9a97',
  variable: '#9ccfd8',
  number: '#eb6f92',
};

const moonEditorTheme = EditorView.theme({
  '&': { backgroundColor: moon.bg, color: moon.fg },
  '.cm-content': { caretColor: moon.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: moon.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#393552' },
  '.cm-gutters': { backgroundColor: moon.bg, color: moon.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: moon.bgSecondary },
  '.cm-activeLine': { backgroundColor: moon.bgSecondary },
});

const moonHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: moon.keyword },
  { tag: tags.operator, color: moon.keyword },
  { tag: tags.variableName, color: moon.fg },
  { tag: tags.function(tags.variableName), color: moon.function },
  { tag: tags.definition(tags.variableName), color: moon.variable },
  { tag: tags.string, color: moon.string },
  { tag: tags.comment, color: moon.comment, fontStyle: 'italic' },
  { tag: tags.number, color: moon.number },
  { tag: tags.bool, color: moon.keyword },
  { tag: tags.null, color: moon.keyword },
  { tag: tags.className, color: moon.variable },
  { tag: tags.typeName, color: moon.variable },
  { tag: tags.propertyName, color: moon.accent },
  { tag: tags.punctuation, color: moon.fgMuted },
]);

export const rosePineMoonTheme: MucoTheme = {
  id: 'rosepine-moon',
  name: 'Moon',
  group: 'Rosé Pine',
  editor: [moonEditorTheme, syntaxHighlighting(moonHighlight)],
  music: {
    scale: ['E4', 'G4', 'A4', 'B4', 'D5', 'E5', 'G5', 'A5'],
    attack: 0.025,
    release: 1.0,
    reverb: 0.65,
    filter: 1800,
  },
  colors: {
    bgPrimary: moon.bg,
    bgSecondary: moon.bgSecondary,
    textPrimary: moon.fg,
    textSecondary: moon.fgMuted,
    accent: moon.accent,
    border: moon.border,
  },
};

// Rosé Pine Dawn
const dawn = {
  bg: '#faf4ed',
  bgSecondary: '#fffaf3',
  fg: '#575279',
  fgMuted: '#9893a5',
  accent: '#907aa9',
  border: '#f2e9e1',
  keyword: '#286983',
  string: '#ea9d34',
  comment: '#9893a5',
  function: '#d7827e',
  variable: '#56949f',
  number: '#b4637a',
};

const dawnEditorTheme = EditorView.theme({
  '&': { backgroundColor: dawn.bg, color: dawn.fg },
  '.cm-content': { caretColor: dawn.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: dawn.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#f2e9e1' },
  '.cm-gutters': { backgroundColor: dawn.bg, color: dawn.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: dawn.bgSecondary },
  '.cm-activeLine': { backgroundColor: dawn.bgSecondary },
});

const dawnHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: dawn.keyword },
  { tag: tags.operator, color: dawn.keyword },
  { tag: tags.variableName, color: dawn.fg },
  { tag: tags.function(tags.variableName), color: dawn.function },
  { tag: tags.definition(tags.variableName), color: dawn.variable },
  { tag: tags.string, color: dawn.string },
  { tag: tags.comment, color: dawn.comment, fontStyle: 'italic' },
  { tag: tags.number, color: dawn.number },
  { tag: tags.bool, color: dawn.keyword },
  { tag: tags.null, color: dawn.keyword },
  { tag: tags.className, color: dawn.variable },
  { tag: tags.typeName, color: dawn.variable },
  { tag: tags.propertyName, color: dawn.accent },
  { tag: tags.punctuation, color: dawn.fgMuted },
]);

export const rosePineDawnTheme: MucoTheme = {
  id: 'rosepine-dawn',
  name: 'Dawn',
  group: 'Rosé Pine',
  editor: [dawnEditorTheme, syntaxHighlighting(dawnHighlight)],
  music: {
    scale: ['F4', 'A4', 'Bb4', 'C5', 'Eb5', 'F5', 'A5', 'Bb5'],
    attack: 0.04,
    release: 0.95,
    reverb: 0.5,
    filter: 2800,
  },
  colors: {
    bgPrimary: dawn.bg,
    bgSecondary: dawn.bgSecondary,
    textPrimary: dawn.fg,
    textSecondary: dawn.fgMuted,
    accent: dawn.accent,
    border: dawn.border,
  },
};
