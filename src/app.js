import React from "react";
import ReactDOM from "react-dom";
import Navigation from './components/Navigation';
import View from './components/View';
import './app.scss'

class StreamViewerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Home"
    };
  }

  handleSelect(event, view) {
    console.log(event);
    if (this.state.selected == view) {
      // refresh
    } else {
      this.setState({selected: view});
    }
  }

  render() {
    const items = [
      { name: "Search", icon: "search" },
      { name: "Home", icon: "home" },
      { name: "Categories", icon: "gamepad" },
      { name: "Channels", icon: "tv" },
      { name: "Following", icon: "star" }
    ];

    return (
      <div className="app">
        <Navigation
          handleSelect={this.handleSelect.bind(this)}
          selected={this.state.selected}
          items={items} />
        <View title={this.state.selected} />
      </div>
    );
  }
}

ReactDOM.render(
  <StreamViewerApp />,
  document.getElementById('app')
);