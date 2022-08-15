import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode,
  appearance: 'primary' | 'ghost',
  arrow?: 'down' | 'right' | 'none',
}