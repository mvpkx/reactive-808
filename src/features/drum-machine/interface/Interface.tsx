import styles from './Interface.module.css';
import PlayButton from './play-button/PlayButton';
import StepSelector from './step-selector/StepSelector';
import TempoKnob from './tempo-knob/TempoKnob';
import VoiceKnobs from './voice-knobs/VoiceKnobs';
import VoiceSelector from './voice-selector/VoiceSelector';
import VolumeKnob from './volume-knob/VolumeKnob';

export default function Interface(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.left}>
          <div>
            <VoiceSelector />
            <VolumeKnob />
            <TempoKnob />
          </div>
          <PlayButton />
        </div>
        <div className={styles.right}>
          <VoiceKnobs />
          <div className={styles.logo}>
            <h1>Rhythm Composer</h1>
            <h1>Reactive-808</h1>
            <p>v 0.0001</p>
          </div>
          <StepSelector />
        </div>
      </div>
    </div>
  );
}
