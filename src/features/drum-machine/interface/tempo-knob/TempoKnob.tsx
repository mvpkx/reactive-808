import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {updateTempo} from '../../drumMachineSlice';
import styles from './TempoKnob.module.css';

export default function TempoKnob(): JSX.Element {
  const tempo = useAppSelector(state => state.drumMachine.tempo);

  const dispatch = useAppDispatch();

  const handleTempoChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: number};
    dispatch(updateTempo({tempo: value}));
  };

  return (
      <label className={styles.container}>
        TEMPO
        <input
          value={tempo}
          type="number"
          onChange={handleTempoChange}
          step="1"
          min="50"
          max="180"
          title={String(tempo)}
          className={styles.knob}
        ></input>
      </label>
  );
}
