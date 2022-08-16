import { FooterProps } from './Footer.props'
import styles from './Footer.module.css'
import cn from 'classnames'
import { format } from 'date-fns'
import { P } from '../../components'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <div {...props} className={cn(styles.footer, className)}>
      <P>
        OwlTop © 2020 - {format(new Date, 'yyyy')} Все права защищены
      </P>
      <a href="#" className={styles.link}>Пользовательское соглашение</a>
      <a href="#" className={styles.link}>Политика конфиденциальности</a>
    </div>
  )
}