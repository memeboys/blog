import React from 'react';
import styles from './FormContainer.module.scss';

export const FormContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
