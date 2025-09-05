import React from 'react';
import styles from './DashboardGrid.module.css';

export const DashboardGrid: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={styles.grid}>{children}</div>
);

export default DashboardGrid;
