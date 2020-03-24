import React from 'react';
import { slice, union, uniq } from 'lodash-es';

import View from '../components/View';
import SearchHistory from '../components/SearchHistory';
import Input from '../components/Input';
import Button from '../components/Button';
import List from '../components/List';

import { searchChannels, searchGames } from '../Api';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channelHasErrored: false,
      channelIsLoading: false,
      channels: [],
      gameHasErrored: false,
      gameIsLoading: false,
      games: [],
      query: '',
      history: []
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      this.setState({ history: JSON.parse(searchHistory) });
    }
  }

  search() {
    const { query, history } = this.state;
    if (query) {
      const queryArray = [query];
      const newHistory = slice(uniq(union(queryArray, history)), 0, 5);

      const encodedQuery = encodeURIComponent(query);
      searchChannels(this.setState, encodedQuery);
      searchGames(this.setState, encodedQuery);

      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      this.setState({
        history: newHistory
      });
    }
  }

  render() {
    const {
      query,
      history,
      channels,
      channelHasErrored,
      channelIsLoading,
      games,
      gameHasErrored,
      gameIsLoading
    } = this.state;
    return (
      <View title='Search'>
        <div className='searchHeader'>
          <Input
            key='searchInput'
            focusPath='searchInput'
            type='text'
            value={query}
            placeholder='Search'
            action={(event) => {
              this.setState({ query: event.target.value });
            }}
          />

          <Button
            key='searchButton'
            focusPath='searchButton'
            action={() => this.search()}
          >
            Search
          </Button>

          <SearchHistory
            history={history}
            search={(input) => {
              this.setState({ query: input });
              this.search();
            }}
          />
        </div>

        {channels && channels.length > 0 && (
          <List
            title='Channels'
            hasErrored={channelHasErrored}
            isLoading={channelIsLoading}
            type='channelSearch'
            items={channels}
          />
        )}

        {games && games.length > 0 && (
          <List
            title='Games'
            hasErrored={gameHasErrored}
            isLoading={gameIsLoading}
            type='gameSearch'
            items={games}
          />
        )}
      </View>
    );
  }
}

export default Search;
