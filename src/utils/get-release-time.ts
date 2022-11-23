import {DURATION_COEFFICIENT} from '../constants';
import {Pattern} from '../types/reducer';
import convertBpmToSec from './convert-bpm-to-sec';

export default function getReleaseTime(
  currentIndex: number,
  pattern: Pattern,
  tempo: number,
  currentTime: number
) {
  const nextIndex = pattern.indexOf(true, currentIndex + 1);
  const delay = convertBpmToSec(tempo);
  const duration = delay * DURATION_COEFFICIENT;
  if (currentIndex === pattern.length - 1) {
    return currentTime + delay - duration;
  } else if (nextIndex > 0) {
    return currentTime + (nextIndex - currentIndex) * delay - duration;
  } else {
    return currentTime + pattern.length * delay - duration;
  }
}
