import React from 'react';

const Player = (props) => {

  return (
    <iframe
      className='twitch-embed'
      src={`https://player.twitch.tv/?channel=${props.match.params.channel}`}
      height='100%'
      width='100%'
      frameborder='0'
      scrolling='no'
      allowfullscreen='true'
    />
  );
}

export default Player;