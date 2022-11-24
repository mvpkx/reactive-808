import { Voices, Volume } from "./reducer";

export default interface Preset {
  name: string;
  tempo: number;
  volume: Volume;
  voices: Voices;
}
