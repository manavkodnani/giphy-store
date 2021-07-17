import { lazy, Suspense } from 'react';
import GifCard from '../GifCard';
import Loader from '../../common/Loader';
import './styles.scss';

const InfiniteScroll = lazy(() => import('react-infinite-scroll-component'));

const DisplayGrid = ({ data, fetchMoreData, loadMore }) => {

  return (
    <div className='grid-wrapper'>
      <Suspense fallback={<div />}>
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore
          scrollableTarget="grid-wrapper"
        >
          {data?.map((elem) => <GifCard key={elem?.id} id={elem?.id} url={elem?.image} />)}
        </InfiniteScroll>
      </Suspense>
        <Loader />
    </div>
  )
}

export default DisplayGrid;