import React from 'react';

import List from '../components/List';
import { fetchGames, fetchStreams, fetchGameName } from '../Api';

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
      list = <List
        title={this.state.gameName ? this.state.gameName : ''}
        hasErrored={this.state.streamHasErrored}
        isLoading={this.state.streamIsLoading}
        items={this.state.streams}
        type='streamList'
        addMore={() => fetchStreams(this.setState, this.state.streams, this.state.gameId, this.state.streamCursor)}
      />
    } else {
      list = <List
        title='Top games'
        hasErrored={this.state.gameHasErrored}
        isLoading={this.state.gameIsLoading}
        items={this.state.games}
        type='gameList'
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
