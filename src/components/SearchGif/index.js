import './styles.scss';

const SearchGif = ({ searchQuery, onSearchGif }) => {
  return (
    <div className='search-wrapper'>
      <input type='search' placeholder='Search GIFs' value={searchQuery} onChange={onSearchGif} />
    </div>
  )
}

export default SearchGif;