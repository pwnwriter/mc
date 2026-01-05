import type { Extension } from '@codemirror/state';

export interface MucoThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface MucoThemeMusic {
  scale: string[];
  attack: number;
  release: number;
  reverb: number;
  filter: number;
}

export interface MucoTheme {
  id: string;
  name: string;
  group: string;
  editor: Extension;
  music: MucoThemeMusic;
  colors: MucoThemeColors;
}

export const themeRegistry: MucoTheme[] = [];

export function registerTheme(theme: MucoTheme): void {
  themeRegistry.push(theme);
}

export function getTheme(id: string): MucoTheme | undefined {
  return themeRegistry.find(t => t.id === id);
}

export function getThemesByGroup(): Map<string, MucoTheme[]> {
  const groups = new Map<string, MucoTheme[]>();
  for (const theme of themeRegistry) {
    const existing = groups.get(theme.group) || [];
    existing.push(theme);
    groups.set(theme.group, existing);
  }
  return groups;
}

export function getDefaultTheme(isDark: boolean): MucoTheme {
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
