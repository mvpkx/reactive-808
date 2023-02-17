/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import DrumMachine from '../features/drum-machine/DrumMachine';
import {loadAudioBuffers, loadUploaded} from '../features/drum-machine/drumMachineSlice';
import Preset from '../types/preset';
import {useAppDispatch, useAppSelector} from './hooks';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const {audioContext} = useAppSelector(state => state.drumMachine);

  useEffect(() => {
    dispatch(loadAudioBuffers(audioContext));

    const queryString = window.location;

    if (queryString.pathname.length > 1) {
      try {
        const decoded = window.atob(queryString.pathname.slice(2));
        const preset = JSON.parse(decoded);
        dispatch(loadUploaded({preset: preset as Preset}));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return <DrumMachine />;
}
