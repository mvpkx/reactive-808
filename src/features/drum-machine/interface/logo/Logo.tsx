import styles from './Logo.module.css';
import {ReactComponent as ReactLogo} from './logo.svg';

export default function Logo(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <h1>Rhythm Composer</h1>
      <ReactLogo className={styles.logo} />
      <h1>Reactive-808</h1>
    </div>
  );
}
