import { HeaderProps } from './Header.props'
import styles from './Header.module.css'
import cn from 'classnames'
import { Sidebar } from '../Sidebar/Sidebar'
import { ButtonIcon } from '../../components'
import Logo from '../logo.svg'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false)
  }, [router])

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {

      }
    },
    closed: {
      opacity: 0,
      x: '100%',
    }
  }
  return (
    <div className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
      <motion.div
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
        className={styles.menu}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.closeButton}
          appearance='white'
          icon='close'
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </div>
  )
}