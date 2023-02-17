import React, {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {VOICE_NAMES} from '../../../../constants';
import Preset from '../../../../types/preset';
import SimpleButton from '../../../common/simple-button';
import {loadUploaded} from '../../drumMachineSlice';
import styles from './index.module.css';

const SaveLoad: React.FC = () => {
  const {voices, tempo, volume} = useAppSelector(state => state.drumMachine);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleSaveClick = () => {
    const fileName = prompt('Enter preset name', 'My Preset');
    if (fileName) {
      const newPreset = {
        name: fileName,
        tempo,
        volume,
        voices: Object.fromEntries(
          VOICE_NAMES.map(name => {
            const voice = {
              volume: voices[name].volume,
              pitch: voices[name].pitch,
              pattern: voices[name].pattern,
            };
            return [name, voice];
          })
        ),
      };
      const json = JSON.stringify(newPreset, null, 2);
      const blob = new Blob([json], {type: 'application/json'});
      const href = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + '.json';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  };

  const handleLoadClick = () => {
    fileInput.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (event.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], 'UTF-8');
      fileReader.onload = e => {
        if (e.target?.result) {
          const preset = JSON.parse(e.target.result as string);
          dispatch(loadUploaded({preset: preset as Preset}));
        }
      };
    }
  };

  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const newPreset = {
      name: 'Shared preset',
      tempo,
      volume,
      voices: Object.fromEntries(
        VOICE_NAMES.map(name => {
          const voice = {
            volume: voices[name].volume,
            pitch: voices[name].pitch,
            pattern: voices[name].pattern,
          };
          return [name, voice];
        })
      ),
    };
    const newLink = window.location.href + window.btoa(JSON.stringify(newPreset));
    setLink(newLink);
  };

  return (
    <div className={styles.wrapper}>
      <SimpleButton text="SAVE" onClick={handleSaveClick} />
      <SimpleButton text="LOAD" onClick={handleLoadClick} />
      <SimpleButton text="SHARE" onClick={handleShare} />
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        style={{display: 'none'}}
        accept=".json"
      />
      {link && (
        <>
          <div
            className={styles.modalBackdrop}
            onClick={() => {
              setLink(null);
              setCopied(false);
            }}
          />

          <div className={styles.modal}>
            <div className={styles.title}>
              <span className={styles.titleText}>Link to share your sequence:</span>
              <span
                className={styles.close}
                onClick={() => {
                  setLink(null);
                  setCopied(false);
                }}
              >
                ✕
              </span>
            </div>
            <textarea
              className={styles.input}
              value={link}
              onFocus={e => {
                e.target.select();
                navigator.clipboard.writeText(link);
                setCopied(true);
              }}
            />
            <span
              className={styles.copiedText}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
              }}
            >
              {copied ? 'Copied!' : 'Click to copy'}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SaveLoad;
