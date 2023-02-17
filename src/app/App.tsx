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

    const {search} = window.location;
    const preset = new URLSearchParams(search);
    const shared = preset.get('shared');

    preset.delete('shared');

    if (shared) {
      try {
        const decoded = window.atob(shared);
        const preset = JSON.parse(decoded);
        dispatch(loadUploaded({preset: preset as Preset}));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return <DrumMachine />;
}
