import styles from './Select.module.css';

interface SelectProps {
  name: string;
  label: string;
  byIndex?: boolean;
  options: string[];
  value: number | string;
  onChange: (event: React.SyntheticEvent) => void;
}

export default function Select({
  name,
  label,
  value,
  onChange,
  byIndex = false,
  options,
}: SelectProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange} className={styles.select}>
        {options.map((option, index) => (
          <option key={option} value={byIndex ? index : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
