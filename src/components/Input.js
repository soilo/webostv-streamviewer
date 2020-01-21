import React from 'react';
import { withFocusable } from 'react-tv-navigation';

const Input = ({focused, setFocus, focusPath, type, value, action }) => {
  let className = 'input '
  className += focused ? 'focused' : 'unfocused'

  return (
    <input
      className={className}
      type={type}
      value={value}
      onBlur={(event) => action(event)}
    />
  );
}

export default withFocusable(Input);
