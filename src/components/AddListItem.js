import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddListItem = ({focused, setFocus, focusPath, itemClass, scroll, index}) => {
  let className = 'item ' + itemClass;
  className += (focused) ? ' focused' : ' unfocused';

  return (
    <span
      className={className}
      onFocus={() => scroll(index)}
    >
      <div className='preview'>
        <FontAwesomeIcon className='icon' icon={ faPlusCircle } />
      </div>
      <div className='titles'>
        <span className='title'>Load more</span>
      </div>
    </span>
  )
}

export default withFocusable(AddListItem);
