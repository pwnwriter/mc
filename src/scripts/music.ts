import * as Tone from 'tone';
import type { McThemeMusic } from './themes/index';

let isInitialized = false;
let clickSynth: Tone.MembraneSynth | null = null;
let backspaceSynth: Tone.MembraneSynth | null = null;
let melodySynth: Tone.PolySynth | null = null;
let padSynth: Tone.PolySynth | null = null;
let reverb: Tone.Reverb | null = null;
let filter: Tone.Filter | null = null;

// Patatap-style synths
let bassSynth: Tone.MembraneSynth | null = null;
let hihatSynth: Tone.MetalSynth | null = null;
let stabSynth: Tone.PolySynth | null = null;
let pluckSynth: Tone.PluckSynth | null = null;
let noiseSynth: Tone.NoiseSynth | null = null;

let currentConfig: McThemeMusic | null = null;
let noteIndex = 0;
let masterVolume = 0.7; // 0-1 range

// Patatap-style key mapping
interface KeySoundConfig {
  type: 'bass' | 'hihat' | 'stab' | 'pluck' | 'noise';
  note?: string;
  frequency?: number;
  duration?: string;
}

const keyMap: Record<string, KeySoundConfig> = {
  // Left home row - Bass kicks
  'a': { type: 'bass', note: 'C1', duration: '16n' },
  's': { type: 'bass', note: 'D1', duration: '16n' },
  'd': { type: 'bass', note: 'E1', duration: '16n' },
  'f': { type: 'bass', note: 'F1', duration: '16n' },
  'g': { type: 'bass', note: 'G1', duration: '16n' },

  // Right home row - Hi-hats
  'h': { type: 'hihat', frequency: 200 },
  'j': { type: 'hihat', frequency: 250 },
  'k': { type: 'hihat', frequency: 300 },
  'l': { type: 'hihat', frequency: 350 },
  ';': { type: 'hihat', frequency: 400 },
  "'": { type: 'hihat', frequency: 500 },

  // Top row - Synth stabs
  'q': { type: 'stab', note: 'C3' },
  'w': { type: 'stab', note: 'D3' },
  'e': { type: 'stab', note: 'E3' },
  'r': { type: 'stab', note: 'F3' },
  't': { type: 'stab', note: 'G3' },
  'y': { type: 'stab', note: 'A3' },
  'u': { type: 'stab', note: 'B3' },
  'i': { type: 'stab', note: 'C4' },
  'o': { type: 'stab', note: 'D4' },
  'p': { type: 'stab', note: 'E4' },
  '[': { type: 'stab', note: 'F4' },
  ']': { type: 'stab', note: 'G4' },

  // Bottom row - Plucks
  'z': { type: 'pluck', note: 'C4' },
  'x': { type: 'pluck', note: 'D4' },
  'c': { type: 'pluck', note: 'E4' },
  'v': { type: 'pluck', note: 'F4' },
  'b': { type: 'pluck', note: 'G4' },
  'n': { type: 'pluck', note: 'A4' },
  'm': { type: 'pluck', note: 'B4' },
  ',': { type: 'pluck', note: 'C5' },
  '.': { type: 'pluck', note: 'D5' },
  '/': { type: 'pluck', note: 'E5' },

  // Numbers - Special sounds
  '1': { type: 'noise', duration: '32n' },
  '2': { type: 'noise', duration: '16n' },
  '3': { type: 'noise', duration: '8n' },
  '4': { type: 'stab', note: 'C2' },
  '5': { type: 'stab', note: 'E2' },
  '6': { type: 'stab', note: 'G2' },
  '7': { type: 'bass', note: 'C2' },
  '8': { type: 'bass', note: 'E2' },
  '9': { type: 'bass', note: 'G2' },
  '0': { type: 'hihat', frequency: 600 },

  // Common punctuation
  ' ': { type: 'noise', duration: '64n' },
  '-': { type: 'pluck', note: 'F5' },
  '=': { type: 'pluck', note: 'G5' },
  '`': { type: 'noise', duration: '32n' },
  '\\': { type: 'hihat', frequency: 450 },
}

export async function initAudio(): Promise<void> {
  if (isInitialized) return;

  try {
    await Tone.start();
    console.log('Audio context started');

  // Create effects chain
  reverb = new Tone.Reverb({ decay: 3, wet: 0.5 }).toDestination();
  filter = new Tone.Filter({ frequency: 2000, type: 'lowpass' }).connect(reverb);

  // Keystroke click synth
  clickSynth = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    octaves: 2,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
    },
  }).toDestination();
  clickSynth.volume.value = -20;

  // Backspace synth - lower, softer tone
  backspaceSynth = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 1,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.001,
      decay: 0.15,
      sustain: 0,
      release: 0.15,
    },
  }).toDestination();
  backspaceSynth.volume.value = -24;

  // Melody synth for patterns
  melodySynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: {
      attack: 0.02,
      decay: 0.3,
      sustain: 0.2,
      release: 0.8,
    },
  }).connect(filter);
  melodySynth.volume.value = -12;

  // Pad synth for sustained harmony
  padSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.5,
      decay: 0.5,
      sustain: 0.8,
      release: 2,
    },
  }).connect(filter);
  padSynth.volume.value = -18;

  // Patatap-style synths (punchy, immediate sounds)

  // Bass synth for left home row - deep kicks
  bassSynth = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0,
      release: 0.2,
    },
  }).toDestination();
  bassSynth.volume.value = -10;

  // Hi-hat synth for right home row - metallic
  hihatSynth = new Tone.MetalSynth({
    frequency: 200,
    envelope: {
      attack: 0.001,
      decay: 0.1,
      release: 0.01,
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination();
  hihatSynth.volume.value = -18;

  // Stab synth for top row - short, punchy
  stabSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'square' },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
    },
  }).toDestination();
  stabSynth.volume.value = -14;

  // Pluck synth for bottom row
  pluckSynth = new Tone.PluckSynth({
    attackNoise: 1,
    dampening: 4000,
    resonance: 0.9,
  }).toDestination();
  pluckSynth.volume.value = -12;

  // Noise synth for special effects
  noiseSynth = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
    },
  }).toDestination();
  noiseSynth.volume.value = -20;

  isInitialized = true;
    console.log('Audio initialized successfully');
  } catch (error) {
    console.error('Failed to initialize audio:', error);
  }
}

export function setMusicConfig(config: McThemeMusic): void {
  currentConfig = config;

  if (melodySynth) {
    melodySynth.set({
      envelope: {
        attack: config.attack,
        release: config.release,
      },
    });
  }

  if (reverb) {
    reverb.wet.value = config.reverb;
  }

  if (filter) {
    filter.frequency.value = config.filter;
  }
}

export function playKeystroke(): void {
  if (!clickSynth || !isInitialized) return;

  const pitches = ['C2', 'D2', 'E2', 'F2', 'G2'];
  const pitch = pitches[Math.floor(Math.random() * pitches.length)];
  clickSynth.triggerAttackRelease(pitch, '32n');
}

export function playBackspace(): void {
  if (!backspaceSynth || !isInitialized) return;

  const pitches = ['F1', 'G1', 'A1'];
  const pitch = pitches[Math.floor(Math.random() * pitches.length)];
  backspaceSynth.triggerAttackRelease(pitch, '32n');
}

export function playKeySound(key: string): void {
  if (!isInitialized) return;

  // Normalize the key to lowercase for letter keys
  const normalizedKey = key.length === 1 ? key.toLowerCase() : key;

  // Get the sound config for this key
  const config = keyMap[normalizedKey];

  if (!config) {
    // Fallback to original click for unmapped keys
    if (clickSynth) {
      clickSynth.triggerAttackRelease('C2', '32n');
    }
    return;
  }

  switch (config.type) {
    case 'bass':
      if (bassSynth && config.note) {
        bassSynth.triggerAttackRelease(config.note, config.duration || '16n');
      }
      break;

    case 'hihat':
      if (hihatSynth && config.frequency) {
        hihatSynth.frequency.value = config.frequency;
        hihatSynth.triggerAttackRelease('16n');
      }
      break;

    case 'stab':
      if (stabSynth && config.note) {
        stabSynth.triggerAttackRelease(config.note, '32n');
      }
      break;

    case 'pluck':
      if (pluckSynth && config.note) {
        pluckSynth.triggerAttack(config.note);
      }
      break;

    case 'noise':
      if (noiseSynth) {
        noiseSynth.triggerAttackRelease(config.duration || '32n');
      }
      break;
  }
}

export function playMelodyNote(): void {
  if (!melodySynth || !currentConfig || !isInitialized) return;

  const note = currentConfig.scale[noteIndex % currentConfig.scale.length];
  melodySynth.triggerAttackRelease(note, '8n');
  noteIndex++;
}

export function playChord(type: 'function' | 'loop' | 'conditional'): void {
  if (!padSynth || !currentConfig || !isInitialized) return;

  const scale = currentConfig.scale;
  let chord: string[];

  switch (type) {
    case 'function':
      // Major chord feel
      chord = [scale[0], scale[2], scale[4]];
      break;
    case 'loop':
      // Suspended feel
      chord = [scale[0], scale[3], scale[4]];
      break;
    case 'conditional':
      // Minor chord feel
      chord = [scale[0], scale[2], scale[5]];
      break;
    default:
      chord = [scale[0]];
  }

  padSynth.triggerAttackRelease(chord, '2n');
}

export function playPatternSound(patterns: {
  hasFunction: boolean;
  hasLoop: boolean;
  hasConditional: boolean;
}): void {
  if (patterns.hasFunction) {
    playChord('function');
  }
  if (patterns.hasLoop) {
    playChord('loop');
  }
  if (patterns.hasConditional) {
    playChord('conditional');
  }
}

export function stopAll(): void {
  if (melodySynth) melodySynth.releaseAll();
  if (padSynth) padSynth.releaseAll();
}

export function isAudioInitialized(): boolean {
  return isInitialized;
}

export function setVolume(volume: number): void {
  masterVolume = Math.max(0, Math.min(1, volume));
  const dbValue = masterVolume === 0 ? -Infinity : Tone.gainToDb(masterVolume);
  Tone.getDestination().volume.value = dbValue;
}

export function getVolume(): number {
  return masterVolume;
}
