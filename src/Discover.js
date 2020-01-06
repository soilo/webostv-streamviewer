import React from 'react';

import GameList from './components/GameList';
import StreamList from './components/StreamList';
import { fetchStreams, fetchGames, enrichStreams } from './Api';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHasErrored: false,
      gameIsLoading: true,
      games: [],
      gamePagination: '',
      streamHasErrored: false,
      streamIsLoading: true,
      streams: [],
      streamPagination: ''
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetchStreams(this.setState);
    fetchGames(this.setState);
  }

  componentDidUpdate() {
    enrichStreams(this.setState, this.state.streams);
  }

  render() {
    return (
      <div className='view Discover'>
        <h1>Discover</h1>
        <StreamList
          title='Streams'
          hasErrored={this.state.streamHasErrored}
          isLoading={this.state.streamIsLoading}
          streams={this.state.streams}
          pagination={this.state.streamPagination}
        />
        <GameList
          title='Games'
          hasErrored={this.state.gameHasErrored}
          isLoading={this.state.gameIsLoading}
          games={this.state.games}
          pagination={this.state.gamePagination}
        />
      </div>
    );
  }
}

export default Discover;