import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import { motion, useMotionValue } from 'framer-motion';

export const Button = ({ children, appearance, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);
  return (
    <motion.button className={cn(styles.button, className, {
      [styles.primary]: appearance === 'primary',
      [styles.ghost]: appearance === 'ghost'
    })}
      {...props}
      whileHover={{ scale: 1.05 }}
      style={{ scale }}
    >
      {children}
      {
        arrow !== 'none' && <span className={cn(styles.arrow, {
          [styles.down]: arrow === 'down',
        })}>
          <ArrowIcon />
        </span>
      }
    </motion.button>
  )
}