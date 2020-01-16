import React from 'react';

import GameList from './components/GameList';
import StreamList from './components/StreamList';
import { fetchGames, fetchStreams, fetchGameName } from './Api';

class Games extends React.Component {
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
      streamCursor: '',
    };
    this.setState = this.setState.bind(this);
  }

  willFetchStreams() {
    fetchStreams(this.setState, this.state.streams, this.state.gameId);
    this.setState({
      shouldFetchStreams: false,
    })
  }

  willFetchGameName() {
    fetchGameName(this.setState, this.state.gameId);
    this.setState({
      shouldFetchGameName: false,
    })
  }

  componentDidMount() {
    fetchGames(this.setState, this.state.games);
  }

  componentDidUpdate() {
    if (this.state.shouldFetchStreams) {
      this.willFetchStreams();
    }
    if (this.state.shouldFetchGameName) {
      this.willFetchGameName();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.gameId !== props.match.params.id) {
      return {
        gameId: props.match.params.id,
        shouldFetchStreams: true,
        shouldFetchGameName: true
      };
    } else {
      return null;
    }
  }

  render() {
    let list;

    if (this.state.gameId) {
      list = <StreamList
        title={this.state.gameName ? this.state.gameName : ''}
        hasErrored={this.state.streamHasErrored}
        isLoading={this.state.streamIsLoading}
        streams={this.state.streams}
        addMore={() => fetchStreams(this.setState, this.state.streams, undefined, this.state.streamCursor)}
      />
    } else {
      list = <GameList
        title='Top games'
        hasErrored={this.state.gameHasErrored}
        isLoading={this.state.gameIsLoading}
        games={this.state.games}
        addMore={() => fetchGames(this.setState, this.state.games, this.state.gameCursor)}
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
