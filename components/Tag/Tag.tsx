import { TagProps } from './Tag.props'
import styles from './Tag.module.css'
import cn from 'classnames'

export const Tag = ({ children, size = 's', href, color = 'ghost', className, ...props }: TagProps): JSX.Element => {
  return (
    <div className={cn(styles.tag, className, {
      [styles.s]: size === 's',
      [styles.m]: size === 'm',
      [styles.red]: color === 'red',
      [styles.primary]: color === 'primary',
      [styles.ghost]: color === 'ghost',
      [styles.green]: color === 'green',
      [styles.grey]: color === 'grey',
    })}
      {...props}
    >
      {
        href ? <a href={href}>{children}</a> :
          <>children</>
      }

    </div>
  )
}