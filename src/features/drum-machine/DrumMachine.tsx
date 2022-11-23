/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {VOICE_NAMES} from '../../constants';
import getReleaseTime from '../../utils/get-release-time';
import {movePlayhead} from './drumMachineSlice';
import Interface from './interface/Interface';

export default function DrumMachine(): JSX.Element {
  const {play, voices, playhead, audioContext, tempo, nextStepTime, volume} = useAppSelector(
    state => state.drumMachine
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (play) {
      const timer = setInterval(() => {
        if (nextStepTime < audioContext.currentTime + 0.1) {
          dispatch(movePlayhead());
        }
      }, 10);
      return () => {
        clearInterval(timer);
      };
    }
  }, [play, playhead]);

  useEffect(() => {
    if (play) {
      if (audioContext.state === 'suspended') audioContext.resume();
      VOICE_NAMES.forEach(name => {
        if (voices[name].pattern[playhead]) {
          const audioBufferSourceNode = new AudioBufferSourceNode(audioContext, {
            buffer: voices[name].audioBuffer,
            detune: Number(voices[name].pitch),
          });
          const gainNode = audioContext.createGain();
          audioBufferSourceNode.connect(gainNode);
          gainNode.connect(audioContext.destination);
          gainNode.gain.value = voices[name].volume * volume;
          gainNode.gain.setTargetAtTime(
            0,
            getReleaseTime(playhead, voices[name].pattern, tempo, audioContext.currentTime),
            0.25
          );
          audioBufferSourceNode.start(nextStepTime);
        }
      });
    }
  }, [play, playhead]);

  return <Interface />;
}
