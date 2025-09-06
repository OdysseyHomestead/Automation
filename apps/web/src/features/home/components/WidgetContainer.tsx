import React, { useState } from 'react';
import { Button } from '@automation/ui';
import styles from './WidgetContainer.module.css';

export interface WidgetContainerProps {
  title: string;
  onRefresh?: () => void | Promise<void>;
  children: React.ReactNode;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  onRefresh,
  children,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await Promise.resolve(onRefresh());
    setRefreshing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {onRefresh && (
          <Button onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? '...' : 'Refresh'}
          </Button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default WidgetContainer;
