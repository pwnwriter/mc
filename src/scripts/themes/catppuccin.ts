import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import type { MucoTheme } from './index';

// Latte (Light)
const latte = {
  bg: '#eff1f5',
  bgSecondary: '#e6e9ef',
  fg: '#4c4f69',
  fgMuted: '#9ca0b0',
  accent: '#8839ef',
  border: '#ccd0da',
  keyword: '#8839ef',
  string: '#40a02b',
  comment: '#9ca0b0',
  function: '#1e66f5',
  variable: '#fe640b',
  number: '#df8e1d',
};

const latteEditorTheme = EditorView.theme({
  '&': { backgroundColor: latte.bg, color: latte.fg },
  '.cm-content': { caretColor: latte.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: latte.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#ccd0da' },
  '.cm-gutters': { backgroundColor: latte.bg, color: latte.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: latte.bgSecondary },
  '.cm-activeLine': { backgroundColor: latte.bgSecondary },
});

const latteHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: latte.keyword },
  { tag: tags.operator, color: latte.keyword },
  { tag: tags.variableName, color: latte.fg },
  { tag: tags.function(tags.variableName), color: latte.function },
  { tag: tags.definition(tags.variableName), color: latte.variable },
  { tag: tags.string, color: latte.string },
  { tag: tags.comment, color: latte.comment, fontStyle: 'italic' },
  { tag: tags.number, color: latte.number },
  { tag: tags.bool, color: latte.keyword },
  { tag: tags.null, color: latte.keyword },
  { tag: tags.className, color: latte.variable },
  { tag: tags.typeName, color: latte.variable },
  { tag: tags.propertyName, color: latte.accent },
  { tag: tags.punctuation, color: latte.fgMuted },
]);

export const catppuccinLatteTheme: MucoTheme = {
  id: 'catppuccin-latte',
  name: 'Latte',
  group: 'Catppuccin',
  editor: [latteEditorTheme, syntaxHighlighting(latteHighlight)],
  music: {
    scale: ['E4', 'F#4', 'G#4', 'B4', 'C#5', 'E5', 'F#5', 'G#5'],
    attack: 0.03,
    release: 0.9,
    reverb: 0.4,
    filter: 3500,
  },
  colors: {
    bgPrimary: latte.bg,
    bgSecondary: latte.bgSecondary,
    textPrimary: latte.fg,
    textSecondary: latte.fgMuted,
    accent: latte.accent,
    border: latte.border,
  },
};

// Frappé
const frappe = {
  bg: '#303446',
  bgSecondary: '#292c3c',
  fg: '#c6d0f5',
  fgMuted: '#a5adce',
  accent: '#ca9ee6',
  border: '#414559',
  keyword: '#ca9ee6',
  string: '#a6d189',
  comment: '#a5adce',
  function: '#8caaee',
  variable: '#ef9f76',
  number: '#e5c890',
};

const frappeEditorTheme = EditorView.theme({
  '&': { backgroundColor: frappe.bg, color: frappe.fg },
  '.cm-content': { caretColor: frappe.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: frappe.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#414559' },
  '.cm-gutters': { backgroundColor: frappe.bg, color: frappe.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: frappe.bgSecondary },
  '.cm-activeLine': { backgroundColor: frappe.bgSecondary },
});

const frappeHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: frappe.keyword },
  { tag: tags.operator, color: frappe.keyword },
  { tag: tags.variableName, color: frappe.fg },
  { tag: tags.function(tags.variableName), color: frappe.function },
  { tag: tags.definition(tags.variableName), color: frappe.variable },
  { tag: tags.string, color: frappe.string },
  { tag: tags.comment, color: frappe.comment, fontStyle: 'italic' },
  { tag: tags.number, color: frappe.number },
  { tag: tags.bool, color: frappe.keyword },
  { tag: tags.null, color: frappe.keyword },
  { tag: tags.className, color: frappe.variable },
  { tag: tags.typeName, color: frappe.variable },
  { tag: tags.propertyName, color: frappe.accent },
  { tag: tags.punctuation, color: frappe.fgMuted },
]);

export const catppuccinFrappeTheme: MucoTheme = {
  id: 'catppuccin-frappe',
  name: 'Frappé',
  group: 'Catppuccin',
  editor: [frappeEditorTheme, syntaxHighlighting(frappeHighlight)],
  music: {
    scale: ['F4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5', 'A5'],
    attack: 0.02,
    release: 0.85,
    reverb: 0.55,
    filter: 2500,
  },
  colors: {
    bgPrimary: frappe.bg,
    bgSecondary: frappe.bgSecondary,
    textPrimary: frappe.fg,
    textSecondary: frappe.fgMuted,
    accent: frappe.accent,
    border: frappe.border,
  },
};

// Macchiato
const macchiato = {
  bg: '#24273a',
  bgSecondary: '#1e2030',
  fg: '#cad3f5',
  fgMuted: '#a5adcb',
  accent: '#c6a0f6',
  border: '#363a4f',
  keyword: '#c6a0f6',
  string: '#a6da95',
  comment: '#a5adcb',
  function: '#8aadf4',
  variable: '#f5a97f',
  number: '#eed49f',
};

const macchiatoEditorTheme = EditorView.theme({
  '&': { backgroundColor: macchiato.bg, color: macchiato.fg },
  '.cm-content': { caretColor: macchiato.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: macchiato.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#363a4f' },
  '.cm-gutters': { backgroundColor: macchiato.bg, color: macchiato.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: macchiato.bgSecondary },
  '.cm-activeLine': { backgroundColor: macchiato.bgSecondary },
});

const macchiatoHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: macchiato.keyword },
  { tag: tags.operator, color: macchiato.keyword },
  { tag: tags.variableName, color: macchiato.fg },
  { tag: tags.function(tags.variableName), color: macchiato.function },
  { tag: tags.definition(tags.variableName), color: macchiato.variable },
  { tag: tags.string, color: macchiato.string },
  { tag: tags.comment, color: macchiato.comment, fontStyle: 'italic' },
  { tag: tags.number, color: macchiato.number },
  { tag: tags.bool, color: macchiato.keyword },
  { tag: tags.null, color: macchiato.keyword },
  { tag: tags.className, color: macchiato.variable },
  { tag: tags.typeName, color: macchiato.variable },
  { tag: tags.propertyName, color: macchiato.accent },
  { tag: tags.punctuation, color: macchiato.fgMuted },
]);

export const catppuccinMacchiatoTheme: MucoTheme = {
  id: 'catppuccin-macchiato',
  name: 'Macchiato',
  group: 'Catppuccin',
  editor: [macchiatoEditorTheme, syntaxHighlighting(macchiatoHighlight)],
  music: {
    scale: ['G4', 'A4', 'B4', 'D5', 'E5', 'G5', 'A5', 'B5'],
    attack: 0.025,
    release: 0.75,
    reverb: 0.6,
    filter: 2200,
  },
  colors: {
    bgPrimary: macchiato.bg,
    bgSecondary: macchiato.bgSecondary,
    textPrimary: macchiato.fg,
    textSecondary: macchiato.fgMuted,
    accent: macchiato.accent,
    border: macchiato.border,
  },
};

// Mocha
const mocha = {
  bg: '#1e1e2e',
  bgSecondary: '#181825',
  fg: '#cdd6f4',
  fgMuted: '#a6adc8',
  accent: '#cba6f7',
  border: '#313244',
  keyword: '#cba6f7',
  string: '#a6e3a1',
  comment: '#a6adc8',
  function: '#89b4fa',
  variable: '#fab387',
  number: '#f9e2af',
};

const mochaEditorTheme = EditorView.theme({
  '&': { backgroundColor: mocha.bg, color: mocha.fg },
  '.cm-content': { caretColor: mocha.accent },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: mocha.accent },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: '#313244' },
  '.cm-gutters': { backgroundColor: mocha.bg, color: mocha.fgMuted, border: 'none' },
  '.cm-activeLineGutter': { backgroundColor: mocha.bgSecondary },
  '.cm-activeLine': { backgroundColor: mocha.bgSecondary },
});

const mochaHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: mocha.keyword },
  { tag: tags.operator, color: mocha.keyword },
  { tag: tags.variableName, color: mocha.fg },
  { tag: tags.function(tags.variableName), color: mocha.function },
  { tag: tags.definition(tags.variableName), color: mocha.variable },
  { tag: tags.string, color: mocha.string },
  { tag: tags.comment, color: mocha.comment, fontStyle: 'italic' },
  { tag: tags.number, color: mocha.number },
  { tag: tags.bool, color: mocha.keyword },
  { tag: tags.null, color: mocha.keyword },
  { tag: tags.className, color: mocha.variable },
  { tag: tags.typeName, color: mocha.variable },
  { tag: tags.propertyName, color: mocha.accent },
  { tag: tags.punctuation, color: mocha.fgMuted },
]);

export const catppuccinMochaTheme: MucoTheme = {
  id: 'catppuccin-mocha',
  name: 'Mocha',
  group: 'Catppuccin',
  editor: [mochaEditorTheme, syntaxHighlighting(mochaHighlight)],
  music: {
    scale: ['A4', 'B4', 'C#5', 'E5', 'F#5', 'A5', 'B5', 'C#6'],
    attack: 0.02,
    release: 0.9,
    reverb: 0.65,
    filter: 1800,
  },
  colors: {
    bgPrimary: mocha.bg,
    bgSecondary: mocha.bgSecondary,
    textPrimary: mocha.fg,
    textSecondary: mocha.fgMuted,
    accent: mocha.accent,
    border: mocha.border,
  },
};
