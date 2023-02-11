import React from 'react';
import styles from './index.module.css';

type SimpleButtonProps = {
  text: string;
} & Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children'
>;

const SimpleButton: React.FC<SimpleButtonProps> = ({text, ...props}) => {
  return (
    <button className={styles.button} {...props}>
      {text}
    </button>
  );
};

export default SimpleButton;
