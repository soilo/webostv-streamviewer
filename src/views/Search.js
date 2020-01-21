import React from 'react';
import { slice, union, uniq } from 'lodash-es';

import SearchHistory from '../components/SearchHistory';
import Input from '../components/Input';
import Button from '../components/Button';
import GameList from '../components/GameList';
import StreamList from '../components/StreamList';

import { searchChannels, searchGames } from '../Api';

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
    let newHistory = slice(uniq(union(queryArray, this.state.history)), 0, 5);

    searchChannels(this.setState, this.state.query);
    searchGames(this.setState, this.state.query);

    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    this.setState({
      history: newHistory
    })
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
          {/* <SearchHistory
            history={this.state.history}
            search={() => console.log('search again')}
          /> */}

          <Input
            key='searchInput'
            focusPath='searchInput'
            type='text'
            value={this.state.query}
            action={(event) => {
              this.setState({ query: event.target.value })
            }}
          />

          <Button
            key='searchButton'
            focusPath='searchButton'
            action={() => this.search()}
          >
            Search
          </Button>
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
