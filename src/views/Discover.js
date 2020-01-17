import React from 'react';

import GameList from '../components/GameList';
import StreamList from '../components/StreamList';
import { fetchStreams, fetchGames, enrichStreams } from '../Api';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHasErrored: false,
      gameIsLoading: true,
      games: [],
      gameCursor: '',
      streamHasErrored: false,
      streamIsLoading: true,
      streams: [],
      streamCursor: ''
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetchStreams(this.setState, this.state.streams);
    fetchGames(this.setState, this.state.games);
  }

  componentDidUpdate() {
    enrichStreams(this.setState, this.state.streams);
  }

  render() {
    return (
      <div className='view Discover'>
        <h1>Discover</h1>
        <StreamList
          title='Live streams'
          hasErrored={this.state.streamHasErrored}
          isLoading={this.state.streamIsLoading}
          streams={this.state.streams}
          addMore={() => fetchStreams(this.setState, this.state.streams, undefined, this.state.streamCursor)}
        />
        <GameList
          title='Top games'
          hasErrored={this.state.gameHasErrored}
          isLoading={this.state.gameIsLoading}
          games={this.state.games}
          addMore={() => fetchGames(this.setState, this.state.games, this.state.gameCursor)}
        />
      </div>
    );
  }
}

export default Discover;
