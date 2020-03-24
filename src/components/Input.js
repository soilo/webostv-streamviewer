import React from 'react';
import { withFocusable } from 'react-tv-navigation';

class Input extends React.PureComponent {
  componentDidMount() {
    const { focusPath, parentFocusPath, setFocus } = this.props;
    const input = document.getElementById(focusPath);
    input.addEventListener(
      'keypress',
      (event) => {
        // enter from virtual keyboard
        if (event.which === 13) {
          setFocus(parentFocusPath);
        }
      },
      false
    );
  }

  render() {
    const {
      focused,
      focusPath,
      type,
      value,
      placeholder,
      action,
      parentFocusPath,
      setFocus
    } = this.props;
    const className = `input ${focused ? 'focused' : 'unfocused'}`;

    return (
      <input
        id={focusPath}
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={(event) => action(event)}
        onClick={(event) => {
          event.preventDefault();
          setFocus(parentFocusPath);
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            setFocus(parentFocusPath);
          }
        }}
      />
    );
  }
}

const InputWrapper = ({
  focused,
  setFocus,
  focusPath,
  type,
  value,
  placeholder,
  action
}) => {
  const className = `input-wrapper ${focused ? 'focused' : 'unfocused'}`;

  const childFocusPath = `${focusPath}-input`;
  const FocusableInput = withFocusable(Input);

  return (
    <button
      className={className}
      type='button'
      onClick={(event) => {
        event.preventDefault();
        setFocus(childFocusPath);
      }}
    >
      <FocusableInput
        key={childFocusPath}
        focusPath={childFocusPath}
        parentFocusPath={`${focusPath}`}
        type={type}
        value={value}
        placeholder={placeholder}
        action={action}
      />
    </button>
  );
};

export default withFocusable(InputWrapper);
