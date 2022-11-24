import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import Knob from '../../../common/knob/Knob';
import {updateTempo} from '../../drumMachineSlice';

export default function TempoKnob(): JSX.Element {
  const tempo = useAppSelector(state => state.drumMachine.tempo);

  const dispatch = useAppDispatch();

  const handleTempoChange = (event: React.SyntheticEvent): void => {
    const {value} = event.target as typeof event.target & {value: number};
    dispatch(updateTempo({tempo: value}));
  };

  return (
    <Knob
      name="tempo"
      label="TEMPO"
      value={tempo}
      onChange={handleTempoChange}
      step={1}
      min={50}
      max={180}
      title={String(tempo)}
    />
  );
}
