import React from 'react';

import GameList from './components/GameList';
import StreamList from './components/StreamList';
import { fetchGames, fetchStreams } from './Api';

class Games extends React.Component {
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
      streamPagination: '',
    };
    this.setState = this.setState.bind(this);
  }

  willFetchStreams() {
    fetchStreams(this.setState, this.state.gameId);
    this.setState({
      shouldFetchStreams: false,
    })
  }

  componentDidMount() {
    fetchGames(this.setState);
  }

  componentDidUpdate() {
    if (this.state.shouldFetchStreams) {
      this.willFetchStreams();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.gameId !== props.match.params.id) {
      return {
        gameId: props.match.params.id,
        shouldFetchStreams: true
      };
    } else {
      return null;
    }
  }



  render() {
    let list;

    if (this.state.gameId) {
      list = <StreamList
        title=''
        hasErrored={this.state.streamHasErrored}
        isLoading={this.state.streamIsLoading}
        streams={this.state.streams}
        pagination={this.state.streamPagination}
      />
    } else {
      list = <GameList
        title=''
        hasErrored={this.state.gameHasErrored}
        isLoading={this.state.gameIsLoading}
        games={this.state.games}
        pagination={this.state.gamePagination}
      />
    }

    return (
      <div className='view Games'>
        <h1>Games</h1>
        {list}
      </div>
    );
  }
}

export default Games;