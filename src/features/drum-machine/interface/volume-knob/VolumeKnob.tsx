import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {Volume} from '../../../../types/reducer';
import Knob from '../../../common/knob/Knob';
import {updateVolume} from '../../drumMachineSlice';

export default function VolumeKnob(): JSX.Element {
  const volume = useAppSelector(state => state.drumMachine.volume);

  const dispatch = useAppDispatch();

  const handleVolumeChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: Volume};
    dispatch(updateVolume({volume: value}));
  };

  return (
    <Knob
      name="master_level"
      label="LEVEL"
      value={volume}
      onChange={handleVolumeChange}
      step={0.1}
      min={0}
      max={1.2}
      title={String(volume)}
    />
  );
}
