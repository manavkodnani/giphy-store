import { useMemo } from 'react';
import './styles.scss'

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <div className='loader'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

const MemoizedLoader = () => {
  return useMemo(() => {
    return <Loader />
  }, []);
};

export default MemoizedLoader;