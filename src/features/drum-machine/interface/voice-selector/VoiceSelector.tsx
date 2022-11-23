import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {VOICE_NAMES} from '../../../../constants';
import {VoiceKey} from '../../../../types/reducer';
import {updateSelector} from '../../drumMachineSlice';
import styles from './VoiceSelector.module.css';

export default function VoiceSelector(): JSX.Element {
  const selector = useAppSelector(state => state.drumMachine.selector);

  const dispatch = useAppDispatch();

  const handleSelectorChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: VoiceKey};
    dispatch(updateSelector({key: value}));
  };

  return (
    <label className={styles.container}>
      INSTRUMENT SELECT
      <select value={selector} onChange={handleSelectorChange} className={styles.knob}>
        {VOICE_NAMES.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
