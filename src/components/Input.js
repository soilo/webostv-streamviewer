import React from 'react';
import { withFocusable } from 'react-tv-navigation';

class Input extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let input = document.getElementById(this.props.focusPath);
    input.addEventListener(
      'keypress',
      (event) => {
        if (event.which == 13) {// enter from virtual keyboard
          this.props.setFocus(this.props.parentFocusPath)
        }
      },
      false);
  }

  render() {
    let className = `input ${this.props.focused ? 'focused' : 'unfocused'}`;

    return (
      <input
        id={this.props.focusPath}
        className={className}
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onBlur={(event) => this.props.action(event)}
        onClick = {() => {
          preventDefault()
          this.props.setFocus(this.props.parentFocusPath)
        }}
        onKeyPress = {(event) => {
          if (event.key == 'Enter') {
            event.preventDefault()
            this.props.setFocus(this.props.parentFocusPath)
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
  let className = `input-wrapper ${focused ? 'focused' : 'unfocused'}`;

  const childFocusPath = `${focusPath}-input`;
  const FocusableInput = withFocusable(Input);

  return (
    <button
      className = {className}
      onClick = {(event) => {
        event.preventDefault()
        setFocus(childFocusPath)
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
  )
}

export default withFocusable(InputWrapper);
