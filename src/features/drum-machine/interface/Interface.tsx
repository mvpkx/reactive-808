import PresetSelector from './preset-selector/PresetSelector';
import VoiceSelector from './voice-selector/VoiceSelector';
import StepTogglers from './step-togglers/StepTogglers';
import PlayButton from './play-button/PlayButton';
import VoiceKnobs from './voice-knobs/VoiceKnobs';
import VolumeKnob from './volume-knob/VolumeKnob';
import TempoKnob from './tempo-knob/TempoKnob';
import styles from './Interface.module.css';
import Logo from './logo/Logo';

export default function Interface(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <div className={styles.left}>
          <div>
            <PresetSelector />
            <VoiceSelector />
            <VolumeKnob />
            <TempoKnob />
          </div>
          <PlayButton />
        </div>
        <div className={styles.right}>
          <VoiceKnobs />
          <Logo />
          <StepTogglers />
        </div>
      </div>
    </div>
  );
}
