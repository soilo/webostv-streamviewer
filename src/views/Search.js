import React from 'react';
import { withFocusable } from 'react-tv-navigation'
import { union, take } from 'lodash-es';

import GameList from '../components/GameList';
import StreamList from '../components/StreamList';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelHasErrored: false,
      channelIsLoading: true,
      channels: [],
      gameHasErrored: false,
      gameIsLoading: true,
      games: [],
      query: '',
      history: []
    };
    this.setState = this.setState.bind(this);
  }

  search() {
    let queryArray = [this.state.query];
    let newHistory = union(queryArray, this.state.history);
    console.log(this.state.query);
    console.log(queryArray);
    console.log(newHistory);
    this.setState({
      history: take(union(queryArray, this.state.history), 5)
    })
    localStorage.setItem('searchHistory', JSON.stringify(this.state.history));
    console.log(this.state.history)
  }

  componentDidMount() {
    const searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      this.setState({ history: JSON.parse(searchHistory) })
    }
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            { this.state.history.map((query) => (
              <li>{query}</li>
            ))}
          </ul>

          <input
            type="text"
            value={this.state.query}
            onBlur={event => {
              this.setState({ query: event.target.value })
            }}
          />

          <button onClick={() => this.search()}>
            Search
          </button>

          <button onClick={() => clearStorage('Search')}>
            Clear
          </button>
        </div>

        <StreamList
          title='Channels'
          hasErrored={this.state.channelHasErrored}
          isLoading={this.state.channelIsLoading}
          streams={this.state.channels}
        />

        <GameList
          title='Games'
          hasErrored={this.state.gameHasErrored}
          isLoading={this.state.gameIsLoading}
          games={this.state.games}
        />
      </div>


    );
  }
}

export default Search;
