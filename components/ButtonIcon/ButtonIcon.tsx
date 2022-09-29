import styles from './ButtonIcon.module.css';
import { ButtonIconProps, icons } from './ButtonIcon.props';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps): JSX.Element => {
  const IconComp = icons[icon];

  return (
    <button className={cn(styles.button, className, {
      [styles.primary]: appearance === 'primary',
      [styles.white]: appearance === 'white'
    })}
      {...props}
    >
      <IconComp />
    </button>
  )
}