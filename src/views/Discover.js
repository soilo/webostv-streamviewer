import React from 'react';

import View from '../components/View';
import List from '../components/List';
import { fetchStreams, fetchGames, enrichStreams } from '../Api';

class Discover extends React.PureComponent {
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
    const { streams, games } = this.state;
    fetchStreams(this.setState, streams);
    fetchGames(this.setState, games);
  }

  componentDidUpdate() {
    const { streams } = this.state;
    enrichStreams(this.setState, streams);
  }

  render() {
    const {
      streamHasErrored,
      streamIsLoading,
      streams,
      streamCursor,
      gameHasErrored,
      gameIsLoading,
      games,
      gameCursor
    } = this.state;
    return (
      <View title='Discover'>
        <List
          title='Live streams'
          hasErrored={streamHasErrored}
          isLoading={streamIsLoading}
          items={streams}
          type='streamList'
          addMore={() =>
            fetchStreams(this.setState, streams, undefined, streamCursor)
          }
        />
        <List
          title='Top games'
          hasErrored={gameHasErrored}
          isLoading={gameIsLoading}
          items={games}
          type='gameList'
          addMore={() => fetchGames(this.setState, games, gameCursor)}
        />
      </View>
    );
  }
}

export default Discover;
