import {VOICE_NAMES, PATTERN_LENGTH} from '../constants/';

type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {length: TLength};

export type Volume = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

export type VoiceKey = typeof VOICE_NAMES[number];

export type Pattern = Tuple<boolean, typeof PATTERN_LENGTH>;

export interface Voice {
  pattern: Pattern;
  volume: Volume;
  pitch: number;
  audioBuffer?: AudioBuffer;
}

export type Voices = Record<VoiceKey, Voice>;

export interface DrumMachineState {
  play: boolean;
  tempo: number;
  playhead: number;
  nextStepTime: number;
  selector: VoiceKey;
  volume: Volume;
  voices: Voices;
  audioContext: AudioContext;
  audioBuffersLoaded: Boolean;
}

export type ReducerAction =
  | {
      type: 'TOGGLE_PLAY';
      payload?: null;
    }
  | {
      type: 'MOVE_PLAYHEAD';
      payload?: null;
    }
  | {
      type: 'CHANGE_TEMPO';
      payload: {
        value: number;
      };
    }
  | {
      type: 'CHANGE_MASTER_VOLUME';
      payload: {
        value: number;
      };
    }
  | {
      type: 'TOGGLE_STEP';
      payload: {
        key: VoiceKey;
        index: number;
      };
    }
  | {
      type: 'UPDATE_SELECTOR';
      payload: {
        key: VoiceKey;
      };
    }
  | {
      type: 'CHANGE_VOICE_VOLUME';
      payload: {
        volume: Volume;
        key: VoiceKey;
      };
    }
  | {
      type: 'CREATE_AC';
      payload?: null;
    };

export interface GetSourceThunkArg {
  key: VoiceKey;
  audioContext: AudioContext;
  arrayBuffer: ArrayBuffer;
}
