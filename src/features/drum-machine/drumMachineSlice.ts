import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {VoiceKey, Volume} from '../../types/reducer';
import createIntitalState from '../../utils/create-initial-state';
import {PATTERN_LENGTH, VOICE_NAMES} from '../../constants';
import convertBpmToSec from '../../utils/convert-bpm-to-sec';
import PRESETS from '../../constants/presets';

const loadAudioBuffers = createAsyncThunk(
  'drumMachine/loadAudioBuffers',
  async (audioContext: AudioContext) => {
    const audioBuffers = [];
    for (let i = 0; i < VOICE_NAMES.length; i++) {
      const response = await fetch(`wav/${VOICE_NAMES[i]}.WAV`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
    }
    return audioBuffers;
  }
);

export const drumMachineSlice = createSlice({
  name: 'drumMachine',
  initialState: createIntitalState,
  reducers: {
    togglePlay: state => {
      if (state.play) {
        state.play = !state.play;
        state.playhead = -1;
      } else {
        state.play = !state.play;
      }
    },
    movePlayhead: state => {
      state.nextStepTime = state.audioContext.currentTime + convertBpmToSec(state.tempo);
      state.playhead = state.playhead < PATTERN_LENGTH - 1 ? state.playhead + 1 : 0;
    },
    toggleStep: (state, action: PayloadAction<{key: VoiceKey; index: number}>) => {
      const {key, index} = action.payload;
      state.voices[key].pattern[index] = !state.voices[key].pattern[index];
    },
    updateSelector: (state, action: PayloadAction<{key: VoiceKey}>) => {
      state.selector = action.payload.key;
    },
    updateVoiceVolume: (state, action: PayloadAction<{key: VoiceKey; volume: Volume}>) => {
      const {key, volume} = action.payload;
      state.voices[key].volume = volume;
    },
    updateVoicePitch: (state, action: PayloadAction<{key: VoiceKey; pitch: number}>) => {
      const {key, pitch} = action.payload;
      state.voices[key].pitch = pitch;
    },
    updateTempo: (state, action: PayloadAction<{tempo: number}>) => {
      const {tempo} = action.payload;
      state.tempo = tempo;
    },
    updateVolume: (state, action: PayloadAction<{volume: Volume}>) => {
      const {volume} = action.payload;
      state.volume = volume;
    },
    loadPreset: (state, action: PayloadAction<{index: number}>) => {
      const {index} = action.payload;
      const preset = PRESETS[index];

      state.preset = index;
      state.volume = preset.volume;
      state.tempo = preset.tempo;

      for (let i = 0; i < VOICE_NAMES.length; i++) {
        state.voices[VOICE_NAMES[i]].pitch = preset.voices[VOICE_NAMES[i]].pitch;
        state.voices[VOICE_NAMES[i]].volume = preset.voices[VOICE_NAMES[i]].volume;
        state.voices[VOICE_NAMES[i]].pattern = preset.voices[VOICE_NAMES[i]].pattern;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadAudioBuffers.fulfilled, (state, action) => {
      const audioBuffers = action.payload;

      for (let i = 0; i < VOICE_NAMES.length; i++) {
        state.voices[VOICE_NAMES[i]].audioBuffer = audioBuffers[i];
      }

      state.audioBuffersLoaded = true;
    });
  },
});

export const {
  togglePlay,
  movePlayhead,
  toggleStep,
  updateSelector,
  updateVoiceVolume,
  updateVoicePitch,
  updateTempo,
  updateVolume,
  loadPreset,
} = drumMachineSlice.actions;

export {loadAudioBuffers};

export default drumMachineSlice.reducer;
