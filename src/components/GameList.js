import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { Link } from 'react-router-dom';

import AddListItem from './AddListItem';

const GameListItem = ({focused, setFocus, focusPath, game, scroll, index}) => {
  let className = 'item gameItem';
  className += (focused) ? ' focused' : ' unfocused';

  const box_art_url = game.box_art_url
    .replace('{width}', '188')
    .replace('{height}','250');

  return (
    <Link
      to={`/game/${game.id}`}
      className={className}
      onFocus={() => scroll(index)}
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

const GameList = ({title, hasErrored, isLoading, games, addMore}) => {
  if (hasErrored) {
    return <p>Sorry! There was an error loading games</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const GameItem = withFocusable(GameListItem);
  const scrollRef = React.createRef();

  const scrollToMiddle = (index) => {
    if (scrollRef.current) {
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
      <div className='list gameList' ref={scrollRef}>
        { games.map((game, index) => (
          <GameItem
            key={game.id}
            focusPath={game.id}
            game={game}
            scroll={scrollToMiddle}
            index={index}
          />
        ))}
        <AddListItem
          focusPath='addGames'
          itemClass='gameItem'
          onClick={() => addMore()}
          onEnterPress={() => addMore()}
          scroll={scrollToMiddle}
          index={games.length}
        />
      </div>
    </div>
  );
}

export default GameList;
