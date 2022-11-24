import {DEFAULT_TEMPO, VOICE_NAMES} from '../constants';
import PRESETS from '../constants/presets';
import {DrumMachineState} from '../types/reducer';
import convertBpmToSec from './convert-bpm-to-sec';

export default function createIntitalState(): DrumMachineState {
  const audioContext = new AudioContext();

  const [defaultPreset] = PRESETS;

  const keyAndValue = VOICE_NAMES.map(name => {
    const voice = {
      volume: defaultPreset.voices[name].volume,
      pitch: defaultPreset.voices[name].pitch,
      pattern: defaultPreset.voices[name].pattern,
    };
    return [name, voice];
  });

  const voices = Object.fromEntries(keyAndValue);

  return {
    audioContext,
    play: false,
    tempo: defaultPreset.tempo,
    selector: VOICE_NAMES[0],
    playhead: -1,
    nextStepTime: audioContext.currentTime + convertBpmToSec(DEFAULT_TEMPO),
    volume: defaultPreset.volume,
    voices,
    audioBuffersLoaded: false,
    preset: 0,
  };
}
