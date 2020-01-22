import React from 'react';
import { slice, union, uniq } from 'lodash-es';

import SearchHistory from '../components/SearchHistory';
import Input from '../components/Input';
import Button from '../components/Button';
import List from '../components/List';

import { searchChannels, searchGames } from '../Api';

class Search extends React.Component {
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

  search() {
    let queryArray = [this.state.query];
    let newHistory = slice(uniq(union(queryArray, this.state.history)), 0, 5);

    let encodedQuery = encodeURIComponent(this.state.query);
    searchChannels(this.setState, encodedQuery);
    searchGames(this.setState, encodedQuery);

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
      <div className='view Search'>
        <h1>Search</h1>

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

        { this.state.channels && this.state.channels.length > 0 &&
          <List
            title='Channels'
            hasErrored={this.state.channelHasErrored}
            isLoading={this.state.channelIsLoading}
            type='channelSearch'
            items={this.state.channels}
          />
        }

        { this.state.games && this.state.games.length > 0 &&
          <List
            title='Games'
            hasErrored={this.state.gameHasErrored}
            isLoading={this.state.gameIsLoading}
            type='gameSearch'
            items={this.state.games}
          />
        }
      </div>
    );
  }
}

export default Search;
