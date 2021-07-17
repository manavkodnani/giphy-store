import { useState, useEffect } from "react";
import Header from './components/Header';
import SearchGif from './components/SearchGif';
import DisplayGrid from './components/DisplayGrid';
import { FETCH_TRENDING_GIFS } from './api/constants';

import './App.scss';

const App = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    const url = `${FETCH_TRENDING_GIFS}&offset=0`;
    fetchTrendingGifs(url);
  }, [])

  const fetchTrendingGifs = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();
    console.log(responseData);
    const formattedData = responseData?.data.map((elem, index) => (
      { id: `${elem?.id}${index}`, image: elem?.images?.fixed_width_downsampled?.url })
    );
    if (Array.isArray(formattedData)) {
      setData([...formattedData]);
    }
  }

  const toggleTheme = (e) => {
    setLightTheme(e.target.checked);
  }

  const themeClass = lightTheme ? 'light-theme' : 'dark-theme';

  return (
    <div className="App">
      <div className={themeClass}>
        <div className="top-container">
          <Header toggleTheme={toggleTheme} theme={lightTheme} />
          <SearchGif />
        </div>
        <DisplayGrid data={data} />
      </div>
    </div>
  );
}

export default App;
