import { useState, useEffect, useCallback } from "react";
import Header from './components/Header';
import SearchGif from './components/SearchGif';
import DisplayGrid from './components/DisplayGrid';
import Loader from "./common/Loader";
import { FETCH_TRENDING_GIFS, FETCH_SEARCH_GIFS } from './api/constants';

import './App.scss';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);


  const fetchGifs = useCallback(async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();
    setTotalCount(responseData?.pagination?.total_count);
    const formattedData = responseData?.data.map((elem, index) => (
      { id: `${elem?.id}${index}`, image: elem?.images?.fixed_width_downsampled?.url })
    );
    if (Array.isArray(formattedData)) {
      // if (loadMore) {
      //   setData([...data, ...formattedData]);
      // } else {
      //   setData(formattedData);
      // }
      setData([...data, ...formattedData]);
    }
    setLoading(false);
    setLoadMore(false);
  }, [data]);

  useEffect(() => {
    let url = '';
    if (searchQuery) {
      url = `${FETCH_SEARCH_GIFS}&q=${searchQuery}&offset=0`;
    } else {
      url = `${FETCH_TRENDING_GIFS}&offset=0`;
    }
    fetchGifs(url);
  }, [searchQuery])

  const toggleTheme = (e) => {
    setLightTheme(e.target.checked);
  }

  const fetchMoreData = () => {
    console.log('inside', totalCount);
    if (data?.length < totalCount) {
      setLoadMore(true);
      let url = '';
      if (!searchQuery) {
        url = `${FETCH_TRENDING_GIFS}&offset=${data?.length}`
      } else {
        url = `${FETCH_SEARCH_GIFS}&q=${searchQuery}&offset=${data?.length}`;
      }
      fetchGifs(url);
    }
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
          <DisplayGrid data={data} fetchMoreData={fetchMoreData} loadMore={loadMore} />
        </div>
      </div>
    </div>
  );
}

export default App;
