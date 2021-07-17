import './styles.scss';

const GifCard = ({ id, url }) => {
  return (
    <div className='gif-card-wrapper'>
      <img alt='' src={url} />
    </div>
  )
};

export default GifCard;