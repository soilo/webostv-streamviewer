import React from 'react';
import { withFocusable } from 'react-tv-navigation';

const Button = ({ focused, action, children }) => {
  const className = `button ${focused ? 'focused' : 'unfocused'}`;

  return (
    <button className={className} type='button' onClick={() => action()}>
      {children}
    </button>
  );
};

export default withFocusable(Button);
