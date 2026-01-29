import * as Tone from 'tone';
import type { MucoThemeMusic } from './themes/index';

let isInitialized = false;
let clickSynth: Tone.MembraneSynth | null = null;
let melodySynth: Tone.PolySynth | null = null;
let padSynth: Tone.PolySynth | null = null;
let reverb: Tone.Reverb | null = null;
let filter: Tone.Filter | null = null;

let currentConfig: MucoThemeMusic | null = null;
let noteIndex = 0;

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

  isInitialized = true;
    console.log('Audio initialized successfully');
  } catch (error) {
    console.error('Failed to initialize audio:', error);
  }
}

export function setMusicConfig(config: MucoThemeMusic): void {
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
