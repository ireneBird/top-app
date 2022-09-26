import { ReviewProps } from './Review.props'
import styles from './Review.module.css'
import cn from 'classnames'
import { Rating } from '../Rating/Rating'
import AvatarIcon from './avatar.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
  const { name, title, description, rating, createdAt } = review
  return (
    <div className={cn(styles.review, className)}
      {...props}
    >
      <AvatarIcon className={styles.icon} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  )
}