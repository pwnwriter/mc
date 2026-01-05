import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, indentOnInput, foldGutter, foldKeymap } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { vim } from '@replit/codemirror-vim';

import { themeRegistry, getTheme, getDefaultTheme, type MucoTheme } from './themes/index';
import { languageRegistry, getLanguage, detectPattern, type MucoLanguage } from './languages/index';
import { getPreset } from './presets/index';
import { initAudio, setMusicConfig, playKeystroke, playMelodyNote, playPatternSound, isAudioInitialized } from './music';

let editorView: EditorView | null = null;
let currentTheme: MucoTheme;
let currentLanguage: MucoLanguage;
let vimEnabled = false;

const themeCompartment = new Compartment();
const languageCompartment = new Compartment();
const vimCompartment = new Compartment();

let lastCode = '';
let keystrokeCount = 0;

export async function initEditor(container: HTMLElement): Promise<EditorView> {
  // Set defaults based on system preference
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = getDefaultTheme(isDark);
  currentLanguage = languageRegistry[0];

  const languageExtension = await currentLanguage.syntax();

  const state = EditorState.create({
    doc: getPreset(currentLanguage.id),
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      foldGutter(),
      history(),
      bracketMatching(),
      closeBrackets(),
      indentOnInput(),
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...closeBracketsKeymap,
        ...foldKeymap,
      ]),
      themeCompartment.of(currentTheme.editor),
      languageCompartment.of(languageExtension),
      vimCompartment.of([]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          handleCodeChange(update.state.doc.toString());
        }
      }),
      EditorView.domEventHandlers({
        keydown: () => {
          handleKeystroke();
        },
      }),
    ],
  });

  editorView = new EditorView({
    state,
    parent: container,
  });

  // Apply theme colors to CSS variables
  applyThemeColors(currentTheme);

  return editorView;
}

function applyThemeColors(theme: MucoTheme): void {
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', theme.colors.bgPrimary);
  root.style.setProperty('--bg-secondary', theme.colors.bgSecondary);
  root.style.setProperty('--text-primary', theme.colors.textPrimary);
  root.style.setProperty('--text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--border', theme.colors.border);
}

async function handleKeystroke(): Promise<void> {
  if (!isAudioInitialized()) {
    await initAudio();
    setMusicConfig(currentTheme.music);
  }

  playKeystroke();
  keystrokeCount++;

  // Play melody note every few keystrokes
  if (keystrokeCount % 3 === 0) {
    playMelodyNote();
  }
}

function handleCodeChange(code: string): void {
  if (!isAudioInitialized()) return;

  // Detect new patterns in the code
  const patterns = detectPattern(code, currentLanguage);
  const lastPatterns = detectPattern(lastCode, currentLanguage);

  // Play sounds for newly detected patterns
  const newPatterns = {
    hasFunction: patterns.hasFunction && !lastPatterns.hasFunction,
    hasLoop: patterns.hasLoop && !lastPatterns.hasLoop,
    hasConditional: patterns.hasConditional && !lastPatterns.hasConditional,
  };

  if (newPatterns.hasFunction || newPatterns.hasLoop || newPatterns.hasConditional) {
    playPatternSound(newPatterns);
  }

  lastCode = code;
}

export async function setTheme(themeId: string): Promise<void> {
  const theme = getTheme(themeId);
  if (!theme || !editorView) return;

  currentTheme = theme;

  editorView.dispatch({
    effects: themeCompartment.reconfigure(theme.editor),
  });

  applyThemeColors(theme);

  if (isAudioInitialized()) {
    setMusicConfig(theme.music);
  }
}

export async function setLanguage(languageId: string): Promise<void> {
  const language = getLanguage(languageId);
  if (!language || !editorView) return;

  currentLanguage = language;
  const extension = await language.syntax();

  editorView.dispatch({
    effects: languageCompartment.reconfigure(extension),
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: getPreset(languageId),
    },
  });

  lastCode = getPreset(languageId);
}

export function toggleVim(): boolean {
  if (!editorView) return false;

  vimEnabled = !vimEnabled;

  editorView.dispatch({
    effects: vimCompartment.reconfigure(vimEnabled ? vim() : []),
  });

  return vimEnabled;
}

export function isVimEnabled(): boolean {
  return vimEnabled;
}

export function getEditor(): EditorView | null {
  return editorView;
}

export function getCurrentTheme(): MucoTheme {
  return currentTheme;
}

export function getCurrentLanguage(): MucoLanguage {
  return currentLanguage;
}

export { themeRegistry, languageRegistry };
