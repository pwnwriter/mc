import type { Extension } from '@codemirror/state';

export interface McThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface McThemeMusic {
  scale: string[];
  attack: number;
  release: number;
  reverb: number;
  filter: number;
}

export interface McTheme {
  id: string;
  name: string;
  group: string;
  editor: Extension;
  music: McThemeMusic;
  colors: McThemeColors;
}

export const themeRegistry: McTheme[] = [];

export function registerTheme(theme: McTheme): void {
  themeRegistry.push(theme);
}

export function getTheme(id: string): McTheme | undefined {
  return themeRegistry.find(t => t.id === id);
}

export function getThemesByGroup(): Map<string, McTheme[]> {
  const groups = new Map<string, McTheme[]>();
  for (const theme of themeRegistry) {
    const existing = groups.get(theme.group) || [];
    existing.push(theme);
    groups.set(theme.group, existing);
  }
  return groups;
}

export function getDefaultTheme(isDark: boolean): McTheme {
  const defaultId = isDark ? 'midnight' : 'dawn';
  return getTheme(defaultId) || themeRegistry[0];
}

// Import and register themes
import { midnightTheme } from './midnight';
import { dawnTheme } from './dawn';
import { catppuccinLatteTheme, catppuccinFrappeTheme, catppuccinMacchiatoTheme, catppuccinMochaTheme } from './catppuccin';
import { rosePineTheme, rosePineMoonTheme, rosePineDawnTheme } from './rosepine';

registerTheme(midnightTheme);
registerTheme(dawnTheme);
registerTheme(catppuccinLatteTheme);
registerTheme(catppuccinFrappeTheme);
registerTheme(catppuccinMacchiatoTheme);
registerTheme(catppuccinMochaTheme);
registerTheme(rosePineTheme);
registerTheme(rosePineMoonTheme);
registerTheme(rosePineDawnTheme);
