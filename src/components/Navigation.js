import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faGamepad, faTv, faStar } from '@fortawesome/free-solid-svg-icons'

const Item = ({focused, setFocus, focusPath, text, link, icon}) => {
  let className = 'navItem';
  className += (focused) ? ' focused' : ' unfocused';
  return (
    <Link to={link} className={className}>
        <FontAwesomeIcon className='icon' icon={icon} />
        <span>{text}</span>
    </Link>
  )
}

const Navigation = () => {
  const NavItem = withFocusable(Item);

  return (
    <nav className='navigation' role='navigation' aria-label='main navigation'>
      <div className='navigation-title'>
        <h1>StreamViewer</h1>
      </div>
      <NavItem focusPath='Search' text='Search' link={'/search'} icon={faSearch} />
      <NavItem focusPath='Discover' text='Discover' link={'/'} icon={faHome} />
      <NavItem focusPath='Categories' text='Categories' link={'/category'} icon={faGamepad} />
      <NavItem focusPath='Channels' text='Channels' link={'/channel'} icon={faTv} />
      <NavItem focusPath='Following' text='Following' link={'/follow'} icon={faStar} />
    </nav>
    );
}

export default Navigation;