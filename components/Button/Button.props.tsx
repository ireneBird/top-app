import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends
  Omit<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: ReactNode,
  appearance: 'primary' | 'ghost',
  arrow?: 'down' | 'right' | 'none',
}