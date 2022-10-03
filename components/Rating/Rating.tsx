import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import { RatingProps } from './Rating.prop';
import styles from './Rating.module.css';
import cn from 'classnames';
import StartIcon from './star.svg';

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(({ isEditable = false, setRating, error, rating, tabIndex, className, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setArrayRating] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, tabIndex]);

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) return -1;

    if (!rating && i === 0) return 0;

    if (r == i + 1) return 0;

    return -1;
  }

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
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKey}
          ref={(r) => ratingArrRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          aria-invalid={!!error}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Укажите рейтинг' : `Рейтинг ${rating}`}
        >
          <StartIcon />
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

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }

    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      if (!rating) {
        setRating(1)
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }

      ratingArrRef.current[rating]?.focus();
    }

    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrRef.current[rating - 2]?.focus();
    }

    // if (e.code == 'Space' || e.code == 'Enter') {
    //   setRating(i)
    // }
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