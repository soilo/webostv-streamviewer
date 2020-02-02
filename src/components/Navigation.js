import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { NavLink as Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faGamepad, faTv, faStar, faUser } from '@fortawesome/free-solid-svg-icons'

let lastFocused;

const Item = ({focused, setFocus, focusPath, text, link, icon}) => {
  let className = 'item';
  className += (focused) ? ' focused' : ' unfocused';
  return (
    <Link
      to={link}
      className={className}
      onFocus={() => lastFocused = focusPath}
    >
      <FontAwesomeIcon className='icon' icon={icon} />
      <span>{text}</span>
    </Link>
  )
}

const Navigation = () => {
  const MenuItem = withFocusable(Item);

  return (
    <nav className='navigation' role='navigation' aria-label='main navigation'>
      <div className='navigation-title'>
        <h1>
          <span className='pink'>Stream</span>
          <span className='white'>Viewer</span>
        </h1>
      </div>
      <MenuItem focusPath='Search' text='Search' link={'/search'} icon={faSearch} />
      <MenuItem focusPath='Discover' text='Discover' link={'/discover'} icon={faHome} />
      <MenuItem focusPath='Games' text='Games' link={'/game'} icon={faGamepad} />
      <MenuItem focusPath='Channels' text='Channels' link={'/channel'} icon={faTv} />
      <MenuItem focusPath='Following' text='Following' link={'/follow'} icon={faStar} />
      <span className='separator'></span>
      <MenuItem focusPath='nav/LogIn' text='Log in' link={'/login'} icon={faUser} />
    </nav>
    );
}

export default Navigation;
