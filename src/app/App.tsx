/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import DrumMachine from '../features/drum-machine/DrumMachine';
import {loadAudioBuffers} from '../features/drum-machine/drumMachineSlice';
import {useAppDispatch, useAppSelector} from './hooks';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const {audioContext} = useAppSelector(state => state.drumMachine);

  useEffect(() => {
    dispatch(loadAudioBuffers(audioContext));
  }, []);

  return <DrumMachine />;
}
