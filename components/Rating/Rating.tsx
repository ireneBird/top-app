import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import { RatingProps } from './Rating.prop';
import styles from './Rating.module.css';
import cn from 'classnames';
import StartIcon from './star.svg';

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(({ isEditable = false, setRating, error, rating, className, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setArrayRating] = useState<JSX.Element[]>(new Array(5).fill(<></>))

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
        >
          <StartIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
          />
        </span>

      );
    });
    setArrayRating(updatedArray)
  }

  const changeDisplay = (i: number) => {
    if (!isEditable) return;

    constructRating(i)
  }

  const onClick = (i: number) => {
    if (!isEditable || !setRating) return;

    setRating(i)
  }

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code !== 'Space' || !setRating) {
      return;
    }

    setRating(i)
  }

  return (
    <div {...props} ref={ref} className={cn(styles.wrapper, {
      [styles.error]: error
    })}>
      {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
      {error && <span className={styles.errorMes}>{error.message}</span>}
    </div>
  )
});