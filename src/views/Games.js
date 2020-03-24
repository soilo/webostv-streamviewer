import React from 'react';

import View from '../components/View';
import List from '../components/List';
import { fetchGames, fetchStreams, fetchGameName } from '../Api';

class Games extends React.PureComponent {
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

  static getDerivedStateFromProps(props, state) {
    if (state.gameId !== props.match.params.id) {
      return {
        gameId: props.match.params.id,
        shouldFetchStreams: true,
        shouldFetchGameName: true
      };
    }
    return null;
  }

  componentDidMount() {
    const { games } = this.state;
    fetchGames(this.setState, games);
  }

  componentDidUpdate() {
    const { shouldFetchStreams, shouldFetchGameName } = this.state;
    if (shouldFetchStreams) {
      this.willFetchStreams();
    }
    if (shouldFetchGameName) {
      this.willFetchGameName();
    }
  }

  willFetchStreams() {
    const { streams, gameId } = this.state;
    fetchStreams(this.setState, streams, gameId);
    this.setState({
      shouldFetchStreams: false
    });
  }

  willFetchGameName() {
    const { gameId } = this.state;
    fetchGameName(this.setState, gameId);
    this.setState({
      shouldFetchGameName: false
    });
  }

  render() {
    const {
      gameId,
      gameName,
      gameHasErrored,
      gameIsLoading,
      games,
      gameCursor,
      streamHasErrored,
      streamIsLoading,
      streams,
      streamCursor
    } = this.state;
    let list;

    if (gameId) {
      list = (
        <List
          title={gameName || ''}
          hasErrored={streamHasErrored}
          isLoading={streamIsLoading}
          items={streams}
          type='streamList'
          addMore={() =>
            fetchStreams(this.setState, streams, gameId, streamCursor)
          }
        />
      );
    } else {
      list = (
        <List
          title='Top games'
          hasErrored={gameHasErrored}
          isLoading={gameIsLoading}
          items={games}
          type='gameList'
          addMore={() => fetchGames(this.setState, games, gameCursor)}
        />
      );
    }

    return <View title='view Games'>{list}</View>;
  }
}

export default Games;
