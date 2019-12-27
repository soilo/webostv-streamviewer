import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faGamepad, faTv, faStar } from '@fortawesome/free-solid-svg-icons'

const Item = ({focused, setFocus, focusPath, text, link, icon}) => {
  let className = 'item';
  className += (focused) ? ' focused' : ' unfocused';
  return (
    <NavLink to={link} className={className} activeClassName='selected'>
      <FontAwesomeIcon className='icon' icon={icon} />
      <span>{text}</span>
    </NavLink>
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
      <MenuItem focusPath='Discover' text='Discover' link={'/'} icon={faHome} />
      <MenuItem focusPath='Categories' text='Categories' link={'/category'} icon={faGamepad} />
      <MenuItem focusPath='Channels' text='Channels' link={'/channel'} icon={faTv} />
      <MenuItem focusPath='Following' text='Following' link={'/follow'} icon={faStar} />
    </nav>
    );
}

export default Navigation;