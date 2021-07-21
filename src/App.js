import { useState, useEffect, useCallback } from "react";
import Header from './components/Header';
import SearchGif from './components/SearchGif';
import DisplayGrid from './components/DisplayGrid';
import Loader from "./common/Loader";
import { FETCH_TRENDING_GIFS, FETCH_SEARCH_GIFS } from './api/constants';
import { debounce } from './utilities/helper-functions';

import './App.scss';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(false);


  const fetchGifs = async (url) => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const formattedData = responseData?.data.map((elem, index) => (
        { id: `${elem?.id}${index}`, image: elem?.images?.fixed_width_downsampled?.url })
      );
      const responseMsg = responseData?.meta?.msg;
      if (Array.isArray(formattedData) && responseMsg === 'OK') {
        if (loadMore) {
          setData([...data, ...formattedData]);
        } else {
          setData(formattedData);
        }
        if (data.length < responseData?.pagination?.total_count) {
          setHasMore(true);
        }
      } else {
        throw new Error();
      }
    }
    catch (error) {
      setError('Something went wrong, please try again after some time, if the issue still persists, contact the support team');
    }
    finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  useEffect(() => {
    let url = '';
    setLoading(true);
    if (searchQuery) {
      url = `${FETCH_SEARCH_GIFS}&q=${searchQuery}&offset=0`;
    } else {
      url = `${FETCH_TRENDING_GIFS}&offset=0`;
    }
    debouncedSearch(url);
  }, [searchQuery])

  useEffect(() => {
    if (loadMore) {
      let url = '';
      if (!searchQuery) {
        url = `${FETCH_TRENDING_GIFS}&offset=${data?.length}`
      } else {
        url = `${FETCH_SEARCH_GIFS}&q=${searchQuery}&offset=${data?.length}`;
      }
      fetchGifs(url);
    }
  }, [loadMore])

  const debouncedSearch = useCallback(
    debounce((url) => fetchGifs(url)),
    []
  );

  const toggleTheme = (e) => {
    setLightTheme(e.target.checked);
  }

  const fetchMoreData = () => {
    setLoadMore(true);
  }

  const onSearchGif = (e) => {
    setSearchQuery(e.target.value);
  }

  const themeClass = lightTheme ? 'light-theme' : 'dark-theme';

  return (
    <div className="App">
      <div className={themeClass}>
        <div className='app-container'>
          <div className="top-container">
            <Header toggleTheme={toggleTheme} theme={lightTheme} />
            <SearchGif searchQuery={searchQuery} onSearchGif={onSearchGif} />
          </div>
          {loading ? <Loader /> : null}
          {error ? <div>{error}</div> :
            <DisplayGrid data={data} fetchMoreData={fetchMoreData} loadMore={loadMore} hasMore={hasMore} />}
        </div>
      </div>
    </div>
  );
}

export default App;
