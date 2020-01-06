import React from 'react';
import TwitchEmbedVideo from 'react-twitch-embed-video';

const Video = (props) => {

  if (props.type && props.type === 'video') {
    return (
      <TwitchEmbedVideo
        autoplay
        video={props.match.params.id}
        height='100%'
        layout='video'
        muted={false}
        targetClass='twitch-embed'
        width='100%'
      />
    );
  } else {
    return (
      <TwitchEmbedVideo
        autoplay
        channel={props.match.params.id}
        height='100%'
        layout='video'
        muted={false}
        targetClass='twitch-embed'
        width='100%'
      />
    );
  }
}

export default Video;