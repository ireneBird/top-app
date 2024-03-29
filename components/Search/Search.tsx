import { KeyboardEvent } from 'react'
import { SearchProps } from './Search.props'
import styles from './Search.module.css'
import cn from 'classnames'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { useState } from 'react'
import SearchIcon from './glass.svg'
import { useRouter } from 'next/router'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    })
  }

  const handleKewDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      goToSearch()
    }
  };

  return (
    <form className={cn(styles.search, className)} {...props} role='search'>
      <Input
        className={styles.input}
        placeholder='Поиск...'
        onChange={e => setSearch(e.target.value)}
        value={search}
        onKeyDown={handleKewDown}
      />
      <Button
        appearance='primary'
        className={styles.button}
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <SearchIcon />
      </Button>
    </form>
  )
}