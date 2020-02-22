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

  componentDidUpdate() {
    this.setPlayer();
  }

  componentWillReceiveProps(nextProps) {
    this.setId();
    this.setPlayer();

    //can check for props and call player functions here
  }

  componentWillUnmount() {
    this.setState({ player: null });
  }

  setId() {
    if (!this.state.id) {
      if (this.props.match.params.channel) {
        this.channel = true;
        this.setState({
          id: `twitch-${this.props.match.params.channel}`
        });
      }
      if (this.props.match.params.video) {
        this.channel = false;
        this.setState({
          id: `twitch-${this.props.match.params.video}`
        });
      }
    }
  }

  setPlayer() {
    if (!this.player) {
      const options = {};
      if (this.channel) {
        options.channel = this.props.match.params.channel;
      } else {
        options.video = this.props.match.params.video;
        options.collection = this.match.params.collection;
      }
      if (typeof window !== 'undefined' && window.Twitch) {
        this.player = new window.Twitch.Player(this.state.id, options);
        this.player.setVolume(1);
      }
    }
  }

  render() {
    return (
      <div
        id={this.state.id || ''}
        className='twitch-embed'
      ></div>
    );
  }
}

export default Player;