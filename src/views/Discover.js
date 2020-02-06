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
    fetchStreams(this.setState, this.state.streams);
    fetchGames(this.setState, this.state.games);
  }

  componentDidUpdate() {
    enrichStreams(this.setState, this.state.streams);
  }

  render() {
    return (
      <View title='Discover'>
        <List
          title='Live streams'
          hasErrored={this.state.streamHasErrored}
          isLoading={this.state.streamIsLoading}
          items={this.state.streams}
          type='streamList'
          addMore={() => fetchStreams(this.setState, this.state.streams, undefined, this.state.streamCursor)}
        />
        <List
          title='Top games'
          hasErrored={this.state.gameHasErrored}
          isLoading={this.state.gameIsLoading}
          items={this.state.games}
          type='gameList'
          addMore={() => fetchGames(this.setState, this.state.games, this.state.gameCursor)}
        />
      </View>
    );
  }
}

export default Discover;
