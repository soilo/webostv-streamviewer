import React from 'react';
import TwitchEmbedVideo from 'react-twitch-embed-video';

const Video = (props) => {

  return (
    <TwitchEmbedVideo
      autoplay
      channel={props.match.params.channel}
      height='100%'
      layout='video'
      muted={false}
      targetClass='twitch-embed'
      width='100%'
    />
  );
}

export default Video;