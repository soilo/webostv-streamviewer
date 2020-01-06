import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { Link } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';

const GameListItem = ({focused, setFocus, focusPath, game}) => {
  let className = 'item gameItem';
  className += (focused) ? ' focused' : ' unfocused';

  const item = React.createRef();

  const box_art_url = game.box_art_url
    .replace('{width}', '188')
    .replace('{height}','250');

  return (
    <Link
      to={`/game/${game.id}`} className={className}
      onFocus={ () => scrollIntoView(item.current, {
        scrollMode: 'if-needed',
        behaviour: 'smooth',
        inline: 'nearest'
      }) }
      ref={item}
    >
      <div className='preview'>
        <img src={box_art_url} alt='boxart' />
      </div>
      <div className='titles'>
        <span className='title'>{game.name}</span>
      </div>
    </Link>
  )
}

const GameList = ({title, hasErrored, isLoading, games}) => {
  if (hasErrored) {
    return <p>Sorry! There was an error loading games</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const GameItem = withFocusable(GameListItem);

  return (
    <div>
      <h2>{title}</h2>
      <div className='list gameList'>
        { games.map((game) =>(
          <GameItem
            key={game.id}
            focusPath={game.id}
            game={game}/>
        ))}
      </div>
    </div>
  );
}

export default GameList;