import GifCard from '../GifCard';
import './styles.scss';

const DisplayGrid = ({ data }) => {

  console.log(data);
  return (
    <div>
      {data?.map((elem) => <GifCard key={elem?.id} id={elem?.id} url={elem?.image} />)}
    </div>
  )
}

export default DisplayGrid;