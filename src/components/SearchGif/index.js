import { useMemo } from 'react';
import './styles.scss';

const SearchGif = ({ searchQuery, onSearchGif }) => {
  return (
    <div className='search-wrapper'>
      <input type='search' placeholder='Search GIFs' value={searchQuery} onChange={onSearchGif} />
    </div>
  )
}

const MemoizedSearchGif = (props) => {
  return useMemo(() => {
    return <SearchGif searchQuery={props.searchQuery} onSearchGif={props.onSearchGif} />
  }, [props.searchQuery, props.onSearchGif])
}

export default MemoizedSearchGif;