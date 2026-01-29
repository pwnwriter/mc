import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, indentOnInput, foldGutter, foldKeymap } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { vim, Vim } from '@replit/codemirror-vim';

import { themeRegistry, getTheme, getDefaultTheme, type MucoTheme } from './themes/index';
import { languageRegistry, getLanguage, detectPattern, type MucoLanguage } from './languages/index';
import { getPreset } from './presets/index';
import { initAudio, setMusicConfig, playKeystroke, playBackspace, playMelodyNote, playPatternSound, isAudioInitialized, setVolume, getVolume } from './music';

let editorView: EditorView | null = null;
let currentTheme: MucoTheme;
let currentLanguage: MucoLanguage;
let vimEnabled = false;

const themeCompartment = new Compartment();
const languageCompartment = new Compartment();
const vimCompartment = new Compartment();

let lastCode = '';
let keystrokeCount = 0;

// Language to filename mapping
const languageFileNames: Record<string, string> = {
  javascript: 'main.js',
  python: 'main.py',
  rust: 'main.rs',
  zig: 'main.zig',
};

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
        // Update cursor position on any selection change
        if (update.selectionSet || update.docChanged) {
          updateStatuslinePosition(update.view);
        }
      }),
      EditorView.domEventHandlers({
        keydown: (event: KeyboardEvent) => {
          handleKeystroke(event.key === 'Backspace' || event.key === 'Delete');

          // Enable vim mode with Ctrl + [
          if (!vimEnabled && event.key === '[' && event.ctrlKey) {
            event.preventDefault();
            enableVim();
          }
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

  // Initialize statusline
  updateStatuslineFile(currentLanguage.id, currentLanguage.name);
  updateStatuslineMode('edit');
  updateStatuslinePosition(editorView);

  // Set up vim mode change listener
  setupVimModeListener();

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

async function handleKeystroke(isBackspace: boolean = false): Promise<void> {
  if (!isAudioInitialized()) {
    await initAudio();
    setMusicConfig(currentTheme.music);
    // Update audio indicator
    const indicator = document.getElementById('audio-indicator');
    if (indicator) {
      indicator.classList.add('active');
      indicator.title = 'Audio active';
    }
  }

  if (isBackspace) {
    playBackspace();
  } else {
    playKeystroke();
    keystrokeCount++;

    // Play melody note every few keystrokes
    if (keystrokeCount % 3 === 0) {
      playMelodyNote();
    }
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

  // Update statusline
  updateStatuslineFile(languageId, language.name);
}

export function toggleVim(): boolean {
  if (!editorView) return false;

  vimEnabled = !vimEnabled;

  editorView.dispatch({
    effects: vimCompartment.reconfigure(vimEnabled ? vim() : []),
  });

  // Update statusline mode
  updateStatuslineMode(vimEnabled ? 'normal' : 'edit');

  return vimEnabled;
}

function enableVim(): void {
  if (!editorView || vimEnabled) return;

  vimEnabled = true;
  editorView.dispatch({
    effects: vimCompartment.reconfigure(vim()),
  });

  // Update statusline mode
  updateStatuslineMode('normal');

  // Sync the toggle button in settings
  const vimToggle = document.getElementById('vim-toggle');
  if (vimToggle) {
    vimToggle.setAttribute('aria-pressed', 'true');
    vimToggle.classList.add('active');
  }
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

// Statusline update functions
function updateStatuslinePosition(view: EditorView): void {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const col = pos - line.from + 1;

  const positionEl = document.getElementById('statusline-position');
  if (positionEl) {
    positionEl.textContent = `${line.number}:${col}`;
  }
}

export function updateStatuslineMode(mode: string): void {
  const modeEl = document.getElementById('statusline-mode');
  if (!modeEl) return;

  // Remove all mode classes
  modeEl.classList.remove('mode-normal', 'mode-insert', 'mode-edit');

  // Only normal and insert modes supported
  const modeMap: Record<string, { class: string; text: string }> = {
    normal: { class: 'mode-normal', text: 'NORMAL' },
    insert: { class: 'mode-insert', text: 'INSERT' },
  };

  const modeInfo = modeMap[mode.toLowerCase()] || { class: 'mode-edit', text: mode.toUpperCase() };
  modeEl.classList.add(modeInfo.class);
  modeEl.textContent = modeInfo.text;
}

export function updateStatuslineFile(languageId: string, languageName: string): void {
  const fileName = languageFileNames[languageId] || `main.${languageId}`;

  const bufferNameEl = document.getElementById('buffer-name');
  const fileEl = document.getElementById('statusline-file');
  const langEl = document.getElementById('statusline-language');

  if (bufferNameEl) bufferNameEl.textContent = fileName;
  if (fileEl) fileEl.textContent = fileName;
  if (langEl) langEl.textContent = languageName;
}

export function getFileName(languageId: string): string {
  return languageFileNames[languageId] || `main.${languageId}`;
}

let vimListenerSetup = false;

function setupVimModeListener(): void {
  if (vimListenerSetup) return;
  vimListenerSetup = true;

  // Disable visual, replace, and command modes - keep only normal and insert
  Vim.unmap('v', 'normal');
  Vim.unmap('V', 'normal');
  Vim.unmap('<C-v>', 'normal');
  Vim.unmap('R', 'normal');
  Vim.unmap(':', 'normal');

  Vim.on('vim-mode-change', (e: { mode: string; subMode?: string }) => {
    if (!vimEnabled) return;
    updateStatuslineMode(e.mode);
  });
}

export { themeRegistry, languageRegistry, setVolume, getVolume };
