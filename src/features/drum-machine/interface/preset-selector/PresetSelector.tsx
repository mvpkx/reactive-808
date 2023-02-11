import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import Select from '../../../common/select/Select';
import {loadPreset} from '../../drumMachineSlice';

export default function PresetSelector(): JSX.Element {
  const {preset, presetsList} = useAppSelector(state => state.drumMachine);

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
      options={presetsList.map(preset => preset.name)}
      value={preset}
      onChange={handleSelectorChange}
    />
  );
}
