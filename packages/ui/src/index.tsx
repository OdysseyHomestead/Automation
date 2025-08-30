import React, { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', style, ...props }) => (
  <button
    {...props}
    style={{
      padding: '8px 14px',
      borderRadius: 6,
      border: '1px solid #ccc',
      cursor: 'pointer',
      background: variant === 'primary' ? '#2563eb' : '#e5e7eb',
      color: variant === 'primary' ? '#fff' : '#111827',
      ...style,
    }}
  />
);
