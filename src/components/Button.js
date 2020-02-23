import React from 'react';
import { withFocusable } from 'react-tv-navigation';

const Button = ({focused, setFocus, focusPath, action, children }) => {
  let className = `button ${focused ? 'focused' : 'unfocused'}`;

  return (
    <button
      className={className}
      onClick={() => action()}
    >
      {children}
    </button>
  );
}

export default withFocusable(Button);
