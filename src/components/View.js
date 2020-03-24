import React from 'react';

class View extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, children } = this.props;
    return (
      <div className={`view ${title}`}>
        <h1>{title}</h1>
        {children}
      </div>
    );
  }
}

export default View;
