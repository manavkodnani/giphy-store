import { useState, useEffect } from "react";
import Header from './components/Header';
import SearchGif from './components/SearchGif';
import DisplayGrid from './components/DisplayGrid';
import Loader from "./common/Loader";
import { FETCH_TRENDING_GIFS } from './api/constants';
import loaderImg from './assets/loader.gif';

import './App.scss';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const url = `${FETCH_TRENDING_GIFS}&offset=0`;
    fetchGifs(url);
  }, [])

  const fetchGifs = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();
    const formattedData = responseData?.data.map((elem, index) => (
      { id: `${elem?.id}${index}`, image: elem?.images?.fixed_width_downsampled?.url })
    );
    if (Array.isArray(formattedData)) {
      setData([...data, ...formattedData]);
    }
    setLoading(false);
    setLoadMore(false);
  }

  const toggleTheme = (e) => {
    setLightTheme(e.target.checked);
  }

  const fetchMoreData = () => {
    setLoadMore(true);
    if (!searchQuery) {
      const url = `${FETCH_TRENDING_GIFS}&offset=${data?.length}`
      fetchGifs(url);
    }
  }

  const themeClass = lightTheme ? 'light-theme' : 'dark-theme';

  return (
    <div className="App">
      <div className={themeClass}>
        <div className='app-container'>
          <div className="top-container">
            <Header toggleTheme={toggleTheme} theme={lightTheme} />
            <SearchGif />
          </div>
          {loading ? <Loader /> : null}
          <DisplayGrid data={data} fetchMoreData={fetchMoreData} loadMore={loadMore} />
        </div>
      </div>
    </div>
  );
}

export default App;
