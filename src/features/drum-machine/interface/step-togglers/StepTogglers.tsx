import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {toggleStep} from '../../drumMachineSlice';
import styles from './StepTogglers.module.css';

export default function StepTogglers(): JSX.Element {
  const {selector, voices, playhead} = useAppSelector(state => state.drumMachine);
  const selected = voices[selector].pattern;

  const dispatch = useAppDispatch();

  const handlePadClick = (index: number) => {
    dispatch(toggleStep({key: selector, index: index}));
  };

  function getStepClassName(isOn: boolean, index: number, isPlaying: boolean): string {
    const className = [styles.step];
    if (index < 4) {
      className.push(styles.step_first_q);
    } else if (index >= 4 && index < 8) {
      className.push(styles.step_second_q);
    } else if (index >= 8 && index < 12) {
      className.push(styles.step_third_q);
    } else {
      className.push(styles.step_fourth_q);
    }
    if (isOn) {
      className.push(styles.step_on);
    }
    if (isPlaying) {
      className.push(styles.step_playing);
    }
    return className.join(' ');
  }

  return (
    <div className={styles.wrapper}>
      {selected.map((pad, index) => (
        <div key={index} className={styles.step_wrapper}>
          <span>{index + 1}</span>
          <button
            onClick={() => handlePadClick(index)}
            className={getStepClassName(pad, index, index === playhead)}
          />
        </div>
      ))}
    </div>
  );
}
