import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import PRESETS from '../../../../constants/presets';
import {loadPreset} from '../../drumMachineSlice';
import styles from './PresetSelector.module.css';

export default function PresetSelector(): JSX.Element {
  const preset = useAppSelector(state => state.drumMachine.preset);

  const dispatch = useAppDispatch();

  const handleSelectorChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: number};
    dispatch(loadPreset({index: value}));
  };

  return (
    <label className={styles.container}>
      PRESET SELECT
      <select value={preset} onChange={handleSelectorChange} className={styles.knob}>
        {PRESETS.map((preset, index) => (
          <option key={preset.name} value={index}>
            {preset.name}
          </option>
        ))}
      </select>
    </label>
  );
}
