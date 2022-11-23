import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {togglePlay} from '../../drumMachineSlice';
import styles from './PlayButton.module.css';

export default function PlayButton(): JSX.Element {
  const play = useAppSelector(state => state.drumMachine.play);

  const dispatch = useAppDispatch();

  const handlePlayStopClick = (): void => {
    dispatch(togglePlay());
  };

  return (
    <button onClick={handlePlayStopClick} className={styles.button}>
      {play ? 'Stop' : 'Play'}
    </button>
  );
}
