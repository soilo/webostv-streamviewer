import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let className = "navItem";
    if (this.props.selected) {
      className += " selected"
    }

    return (
      <button className={className} onClick={(event) => this.props.handleSelect(event, this.props.name)} >
        <FontAwesomeIcon icon={['fas', `${this.props.icon}`]} />
        {this.props.name}
      </button>
    )
  }
}

export default NavItem;