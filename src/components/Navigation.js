import React from 'react'
import NavItem from './NavItem';
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Search", icon: "search", view: "red" },
        { name: "Home", icon: "home", view: "green" },
        { name: "Categories", icon: "gamepad", view: "blue" },
        { name: "Channels", icon: "tv", view: "yellow" },
        { name: "Following", icon: "star", view: "purple" }
      ],
      selected: "Home"
    };
  }



  render() {
    return (
      <nav className='navigation' role='navigation' aria-label='main navigation'>
        <div className='navigation-title'>
          <h1>StreamViewer</h1>
        </div>
        {this.state.items.map(item => (
          <NavItem
            key={item.icon}
            icon={item.icon}
            name={item.name}
            selected={this.state.selected == item.name}/>
        ))}
      </nav>
    );
  }
}

export default Navigation;