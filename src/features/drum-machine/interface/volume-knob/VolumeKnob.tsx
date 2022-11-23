import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {Volume} from '../../../../types/reducer';
import {updateVolume} from '../../drumMachineSlice';
import styles from './VolumeKnob.module.css';

export default function VolumeKnob(): JSX.Element {
  const volume = useAppSelector(state => state.drumMachine.volume);

  const dispatch = useAppDispatch();

  const handleVolumeChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: Volume};
    dispatch(updateVolume({volume: value}));
  };

  return (
    <label className={styles.container}>
      MASTER LEVEL
      <input
        value={volume}
        type="number"
        onChange={handleVolumeChange}
        step="0.1"
        min="0"
        max="1"
        className={styles.knob}
      />
    </label>
  );
}
