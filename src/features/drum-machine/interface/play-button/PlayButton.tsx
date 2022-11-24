import {useAppDispatch} from '../../../../app/hooks';
import {togglePlay} from '../../drumMachineSlice';
import styles from './PlayButton.module.css';

export default function PlayButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const handlePlayStopClick = (): void => {
    dispatch(togglePlay());
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePlayStopClick} className={styles.button}>
        START
        <div />
        STOP
      </button>
    </div>
  );
}
