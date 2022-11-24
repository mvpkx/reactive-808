import styles from './Select.module.css';

interface SelectProps {
  name: string;
  label: string;
  options: string[];
  value: number | string;
  onChange: (event: React.SyntheticEvent) => void;
}

export default function Select({name, label, value, onChange, options}: SelectProps): JSX.Element {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange} className={styles.select}>
        {options.map((option, index) => (
          <option key={option} value={typeof value === 'string' ? option : index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
