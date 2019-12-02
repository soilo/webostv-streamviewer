import React from 'react'
import NavItem from './NavItem';
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className='navigation' role='navigation' aria-label='main navigation'>
        <div className='navigation-title'>
          <h1>StreamViewer</h1>
        </div>
        {this.props.items.map(item => (
          <NavItem
            key={item.icon}
            icon={item.icon}
            name={item.name}
            selected={this.props.selected == item.name}
            handleSelect={this.props.handleSelect} />
        ))}
      </nav>
    );
  }
}

export default Navigation;