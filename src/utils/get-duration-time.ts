import {DURATION_COEFFICIENT} from '../constants';
import {Pattern} from '../types/reducer';
import convertBpmToSec from './convert-bpm-to-sec';

export default function getDurationTime(currentIndex: number, pattern: Pattern, tempo: number) {
  const nextIndex = pattern.indexOf(true, currentIndex + 1);
  const delay = convertBpmToSec(tempo);
  if (currentIndex === pattern.length - 1) {
    return delay - delay * DURATION_COEFFICIENT;
  } else if (nextIndex > 0) {
    return (nextIndex - currentIndex) * delay - delay * DURATION_COEFFICIENT;
  } else {
    return pattern.length * delay - delay * DURATION_COEFFICIENT;
  }
}
