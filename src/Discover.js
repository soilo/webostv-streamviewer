import React from 'react';

import StreamList from './components/StreamList';
import { fetchStreams, enrichStreams } from './Api';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false,
      isLoading: true,
      streams: [],
      pagination: ''
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetchStreams(this.setState);
  }

  componentDidUpdate() {
    enrichStreams(this.state.streams, this.setState);
  }

  render() {
    return (
      <div className='view Discover'>
        <h1>Discover</h1>
        <StreamList
          title='Streams'
          hasErrored={this.state.hasErrored}
          isLoading={this.state.isLoading}
          streams={this.state.streams}
          pagination={this.state.pagination}
        />
      </div>
    );
  }
}

export default Discover;