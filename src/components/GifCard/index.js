import './styles.scss';
import playImg from '../../assets/play.png';
import pauseImg from '../../assets/pause.png';

const GifCard = ({ id, playUrl, pauseUrl, play, handleToggleGif }) => {

  const url = play ? playUrl : pauseUrl;
  const imgAltText = play ? 'Pause' : 'Play';
  const currentStateImg = play ? pauseImg : playImg;
  return (
    <div className='gif-card-wrapper'>
      <img alt='' src={url} />
      <img alt={imgAltText} className='gif-card-wrapper-play' src={currentStateImg} onClick={() => handleToggleGif(id)} />
    </div>
  )
};

export default GifCard;