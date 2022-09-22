
import cn from 'classnames'
import styles from './Advantages.module.css'
import { AdvantagesProps } from './Advantages.props'
import СheckIcon from './check.svg'

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    < >
      {advantages.map((a) => (
        <div className={styles.advantage} key={a._id}>
          <СheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <p className={styles.description}>{a.description}</p>
        </div>
      ))}
    </>
  )
}