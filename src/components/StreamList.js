import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { Link } from 'react-router-dom';

import AddListItem from './AddListItem';

const StreamListItem = ({focused, setFocus, focusPath, stream, scroll, index}) => {
  let className = 'item streamItem';
  className += (focused) ? ' focused' : ' unfocused';

  const item = React.createRef();

  const thumbnail_url = stream.thumbnail_url
    .replace('{width}', '440')
    .replace('{height}','248');

  if (parseInt(stream.viewer_count) > 1000) {
    stream.viewer_count = (parseInt(stream.viewer_count) / 1000).toFixed(0) + 'K';
  }

  return (
    <Link
      to={`/stream/${stream.user_name}`}
      className={className}
      onFocus={ () => scroll(index) }
      ref={item}
    >
      <div className='preview'>
        <img src={thumbnail_url} alt='thumbnail' />
      </div>
      <div className='titles'>
        <span className='title'>{stream.title}</span>
        <span className='subtitle'>{stream.user_name}</span>
        <span className='subtitle'>{stream.game == undefined ? '' : stream.game.name}</span>
        <span className='subtitle'>{stream.viewer_count} viewers</span>
      </div>
    </Link>
  )
}

const StreamList = ({title, hasErrored, isLoading, streams, addMore}) => {
  if (hasErrored) {
    return <p>Sorry! There was an error loading streams</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const StreamItem = withFocusable(StreamListItem);
  const scrollRef = React.createRef();

  const scrollToMiddle = (index) => {
    if(scrollRef.current) {
      const itemWidth = scrollRef.current.getElementsByClassName('item')[0].offsetWidth;
      scrollRef.current.scrollTo({
        left: index * itemWidth - 300,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className='list streamList' ref={scrollRef} >
        { streams.map((stream, index) =>(
          <StreamItem
            key={stream.id}
            focusPath={stream.id}
            stream={stream}
            scroll={scrollToMiddle}
            index={index}
          />
        ))}
        <AddListItem
          focusPath='addStream'
          itemClass='streamItem'
          onClick={() => addMore()}
          onEnterPress={() => addMore()}
          scroll={scrollToMiddle}
          index={streams.length}
        />
      </div>
    </div>
  );
}

export default StreamList;
