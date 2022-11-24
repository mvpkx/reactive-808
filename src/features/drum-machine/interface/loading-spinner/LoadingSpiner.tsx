import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  show: boolean;
}

export default function LoadingSpinner({show}: LoadingSpinnerProps): JSX.Element {
  if (show) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner}></div>
        <p>Loading audio...</p>
      </div>
    );
  } else {
    return <></>;
  }
}
