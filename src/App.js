import { useState, useEffect } from "react";
import SearchGif from './components/SearchGif';
import DisplayGrid from './components/DisplayGrid';
import { FETCH_TRENDING_GIFS } from './api/constants';

const App = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `${FETCH_TRENDING_GIFS}&offset=0`;
    fetchTrendingGifs(url);
  }, [])

  const fetchTrendingGifs = async (url) => {
    const response = await fetch(url);
    const responseData = await response.json();
    console.log(responseData);
    const formattedData = responseData?.data.map((elem, index) => (
      {id : `${elem?.id}${index}`, image: elem?.images?.fixed_width_downsampled?.url})
    );
    if (Array.isArray(formattedData)) {
      setData([ ...formattedData ]);
    }
  }


  return (
    <div className="App">
      <SearchGif />
      <DisplayGrid data={data} />
    </div>
  );
}

export default App;
