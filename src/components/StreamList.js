import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { Link } from 'react-router-dom';

const StreamListItem = ({focused, setFocus, focusPath, stream}) => {
  let className = 'item streamItem';
  className += (focused) ? ' focused' : ' unfocused';

  const item = React.createRef();

  const thumbnail_url = stream.thumbnail_url
    .replace('{width}', '320')
    .replace('{height}','180');

  return (
    <Link
      to={`/stream/${stream.user_name}`} className={className}
      onFocus={ () => item.current.scrollIntoView({
        behaviour: 'smooth',
        inline: 'nearest'
      }) }
      ref={item}
    >
      <div className='preview'>
        <img src={thumbnail_url} alt='thumbnail' />
      </div>
      <div classNames='titles'>
        <span className='title'>{stream.title}</span>
        <span className='subtitle'>{stream.user_name}</span>
        <span className='subtitle'>{stream.game == undefined ? '' : stream.game.name}</span>
        <span className='subtitle'>{stream.viewer_count}</span>
      </div>
    </Link>
  )
}

const StreamList = ({title, hasErrored, isLoading, streams}) => {
  if (hasErrored) {
    return <p>Sorry! There was an error loading streams</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const StreamItem = withFocusable(StreamListItem);

  return (
    <div>
      <h2>{title}</h2>
      <div className='list streamList'>
        { streams.map((stream) =>(
          <StreamItem
            key={stream.id}
            focusPath={stream.id}
            stream={stream}/>
        ))}
      </div>
    </div>
  );
}

export default StreamList;