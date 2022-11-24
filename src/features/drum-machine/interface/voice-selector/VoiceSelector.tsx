import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {updateSelector} from '../../drumMachineSlice';
import {VOICE_NAMES} from '../../../../constants';
import {VoiceKey} from '../../../../types/reducer';
import Select from '../../../common/select/Select';

export default function VoiceSelector(): JSX.Element {
  const selector = useAppSelector(state => state.drumMachine.selector);

  const dispatch = useAppDispatch();

  const handleSelectorChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: VoiceKey};

    dispatch(updateSelector({key: value}));
  };

  return (
    <Select
      name="instrument"
      label="INSTRUMENT"
      options={[...VOICE_NAMES]}
      value={selector}
      onChange={handleSelectorChange}
    />
  );
}
