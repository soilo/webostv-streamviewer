import React from 'react'

class View extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`view ${this.props.title}`}>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    );
  }
}

export default View;