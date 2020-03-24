import React from 'react';
import 'twitch-embed';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      id: null
    };
  }

  componentWillMount() {
    this.setId();
  }

  componentDidMount() {
    this.setPlayer();
  }

  componentWillReceiveProps() {
    this.setId();
    this.setPlayer();

    // can check for props and call player functions here
  }

  componentDidUpdate() {
    this.setPlayer();
  }

  componentWillUnmount() {
    this.player = null;
  }

  setId() {
    const { id } = this.state;
    const { match } = this.props;
    if (!id) {
      if (match.params.channel) {
        this.channel = true;
        this.setState({
          id: `twitch-${match.params.channel}`
        });
      }
      if (match.params.video) {
        this.channel = false;
        this.setState({
          id: `twitch-${match.params.video}`
        });
      }
    }
  }

  setPlayer() {
    const { id } = this.state;
    const { match } = this.props;
    if (!this.player) {
      const options = {};
      if (this.channel) {
        options.channel = match.params.channel;
      } else {
        options.video = match.params.video;
        options.collection = match.params.collection;
      }
      if (typeof window !== 'undefined' && window.Twitch) {
        this.player = new window.Twitch.Player(id, options);
        this.player.setVolume(1);
      }
    }
  }

  render() {
    const { id } = this.state;
    return <div id={id || ''} className='twitch-embed' />;
  }
}

export default Player;
