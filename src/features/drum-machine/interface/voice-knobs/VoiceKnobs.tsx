import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {VOICE_NAMES} from '../../../../constants';
import {VoiceKey, Volume} from '../../../../types/reducer';
import Knob from '../../../common/knob/Knob';
import {updateVoicePitch, updateVoiceVolume} from '../../drumMachineSlice';
import styles from './VoiceKnobs.module.css';

export default function VoiceKnobs(): JSX.Element {
  const voices = useAppSelector(state => state.drumMachine.voices);

  const dispatch = useAppDispatch();

  const handleVolumeChange = (event: React.SyntheticEvent): void => {
    const {name, value} = event.target as typeof event.target & {
      name: VoiceKey;
      value: Volume;
    };

    dispatch(updateVoiceVolume({key: name, volume: value}));
  };

  const handlePitchChange = (event: React.SyntheticEvent): void => {
    const {name, value} = event.target as typeof event.target & {
      name: VoiceKey;
      value: number;
    };
    dispatch(updateVoicePitch({key: name, pitch: value}));
  };

  return (
    <div className={styles.container}>
      {VOICE_NAMES.map(name => (
        <div className={styles.voice} key={name}>
          <Knob
            name={name}
            label="LEVEL"
            step={0.1}
            min={0}
            max={1.5}
            title={`Set ${name} volume`}
            value={voices[name].volume}
            onChange={handleVolumeChange}
          />
          <Knob
            name={name}
            label="TONE"
            step={50}
            min={-1400}
            max={1400}
            title={`Set ${name} pitch`}
            value={voices[name].pitch}
            onChange={handlePitchChange}
          />
          <span className={styles.voice_name}>{name}</span>
        </div>
      ))}
    </div>
  );
}
