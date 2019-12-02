import React from "react";
import ReactDOM from "react-dom";
import Navigation from './components/Navigation';
import View from './components/View';
import './app.scss'

class StreamViewerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navigation />
        <View />
      </div>
    );
  }
}

ReactDOM.render(
  <StreamViewerApp />,
  document.getElementById('app')
);