import {
  PATTERN_LENGTH,
  DEFAULT_TEMPO,
  VOICE_NAMES,
  DEFAULT_VOICE_VOLUME,
  DEFAULT_MASTER_VOLUME,
  DEFAULT_PITCH,
} from '../constants';
import {DrumMachineState} from '../types/reducer';
import convertBpmToSec from './convert-bpm-to-sec';

export default function createIntitalState(): DrumMachineState {
  const audioContext = new AudioContext();
  const keyAndValue = VOICE_NAMES.map(name => {
    const voice = {
      volume: DEFAULT_VOICE_VOLUME,
      pitch: DEFAULT_PITCH,
      pattern: new Array(PATTERN_LENGTH).fill(false),
    };
    return [name, voice];
  });

  const voices = Object.fromEntries(keyAndValue);

  return {
    audioContext,
    play: false,
    tempo: DEFAULT_TEMPO,
    selector: VOICE_NAMES[0],
    playhead: -1,
    nextStepTime: audioContext.currentTime + convertBpmToSec(DEFAULT_TEMPO),
    volume: DEFAULT_MASTER_VOLUME,
    voices,
    audioBuffersLoaded: false,
  };
}
