import { SortEnum, SortProps } from './Sort.props'
import styles from './Sort.module.css'
import cn from 'classnames'
import SortIcon from './sort.svg'
import { KeyboardEvent } from 'react'

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
  const sortKey = (e: KeyboardEvent, sort: SortEnum) => {
    if (e.code == 'Space' || e.code == 'Enter') {
      setSort(sort);
    }
  };

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn(styles.sortBtn, {
          [styles.active]: sort == SortEnum.Rating
        })}
        onKeyDown={(e: KeyboardEvent) => sortKey(e, SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon} />По рейтингу
      </button>
      <button
        onClick={() => setSort(SortEnum.Price)}
        onKeyDown={(e: KeyboardEvent) => sortKey(e, SortEnum.Price)}
        className={cn(styles.sortBtn, {
          [styles.active]: sort == SortEnum.Price
        })}
      >
        <SortIcon className={styles.sortIcon} />По цене
      </button>
    </div >
  )
}