import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import PRESETS from '../../../../constants/presets';
import Select from '../../../common/select/Select';
import {loadPreset} from '../../drumMachineSlice';

export default function PresetSelector(): JSX.Element {
  const preset = useAppSelector(state => state.drumMachine.preset);

  const dispatch = useAppDispatch();

  const handleSelectorChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: number};
    dispatch(loadPreset({index: value}));
  };

  return (
    <Select
      name="preset"
      label="PRESET"
      byIndex={true}
      options={PRESETS.map(preset => preset.name)}
      value={preset}
      onChange={handleSelectorChange}
    />
  );
}
