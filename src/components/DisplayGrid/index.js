import { lazy, Suspense } from 'react';
import GifCard from '../GifCard';
import Loader from '../../common/Loader';
import './styles.scss';

const InfiniteScroll = lazy(() => import('react-infinite-scroll-component'));

const DisplayGrid = ({ data, fetchMoreData, loadMore, hasMore, handleToggleGif }) => {

  return (
    <div className='grid-wrapper'>
      <Suspense fallback={<div />}>
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore={!loadMore && hasMore}
          scrollableTarget="grid-wrapper"
        >
          {data?.map((elem) => <GifCard key={elem?.id} id={elem?.id} playUrl={elem?.image} handleToggleGif={handleToggleGif} pauseUrl={elem?.stillImage} play={elem?.play} />)}
        </InfiniteScroll>
      </Suspense>
        {loadMore ? <Loader /> : null}
    </div>
  )
}

export default DisplayGrid;