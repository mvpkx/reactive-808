import styles from './Knob.module.css';
import cx from 'classnames';

interface KnobProps {
  name: string;
  label: string;
  value: any;
  onChange: (event: React.SyntheticEvent) => void;
  step: number;
  min: number;
  max: number;
  title: string;
  className?: string;
}

export default function Knob({
  name,
  label,
  value,
  onChange,
  step,
  min,
  max,
  title,
  className,
}: KnobProps): JSX.Element {
  return (
    <div className={cx(styles.container, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        title={title}
        value={value}
        onChange={onChange}
        className={styles.knob}
      />
    </div>
  );
}
