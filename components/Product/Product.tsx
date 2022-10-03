/* eslint-disable @next/next/no-img-element */
import { ProductProps } from './Product.props'
import cn from 'classnames'
import styles from './Product.module.css'
import { Card } from '../Card/Card'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { P } from '../P/P'
import { Button } from '../Button/Button'
import { declOfNum, priceRu } from '../../helpers/helpers'
import { Divider } from '../Divider/Divider'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { motion } from 'framer-motion'

// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: {
      height: 'auto',
      opacity: 1
    },
    hidden: {
      height: 0,
      opacity: 0
    }
  }

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    reviewRef.current?.focus();
  }

  return (
    <div className={className} {...props} ref={ref}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <img
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span className='visualHidden'>цена</span>{priceRu(product.price)}
          {product.oldPrice && <Tag className={styles.oldPrice} color='green'>
            <span className='visualHidden'>Скидка</span>
            {priceRu(product.oldPrice - product.price)}</Tag>}
        </div>
        <div className={styles.credit}>
          <span className='visualHidden'>в кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span></div>
        <div className={styles.rating}>
          <span className='visualHidden'>{'рейтинг ' + (product.reviewAvg ?? product.initialRating)}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map(c => <Tag key={c} color='ghost'>{c}</Tag>)}
        </div>
        <div className={styles.priceTitle} aria-hidden>цена</div>
        <div className={styles.creditTitle} aria-hidden>в кредит</div>
        <div className={styles.rateTitle}><a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declOfNum(+product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {
            product.advantages && <div className={styles.advantages}>
              <h4 className={styles.advTitle}>Преимущества</h4>
              <P>{product.advantages}</P>
            </div>
          }
          {
            product.disadvantages && <div className={styles.disadvantages}>
              <h4 className={styles.advTitle}>Недостатки</h4>
              <P>{product.disadvantages}</P>
            </div>
          }
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button
            appearance="ghost"
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
            aria-expanded={isReviewOpened}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div
        layout
        variants={variants}
        initial={'hidden'}
        animate={isReviewOpened ? 'visible' : 'hidden'}
        className={styles.cardsReview}
      >
        <Card color='blue' ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
          {product.reviews && product.reviews.map((r) => <div key={r._id}>
            <Review review={r} />
            <Divider />
          </div>)}
          <ReviewForm productId={product._id} isOpened={isReviewOpened} />
        </Card>
      </motion.div>
    </div>
  )
}))