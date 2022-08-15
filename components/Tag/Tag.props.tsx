import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 's' | 'm';
  color?: 'red' | 'green' | 'primary' | 'grey' | 'ghost';
  href?: string;
}