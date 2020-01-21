import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const HistoryItem = ({ focused, setFocus, focusPath, children }) => {
  let className = 'historyItem';
  className += (focused) ? ' focused' : ' unfocused';

  return (
    <span className={className}>
      <FontAwesomeIcon className='icon' icon={faClock} />
      <span>{children}</span>
    </span>
  );
}

const SearchHistory = ({history, search}) => {

  const SearchHistoryItem = withFocusable(HistoryItem);

  return (
    <div className='history'>
      { history.map((text) => (
        <SearchHistoryItem
          key={text}
          focusPath={text}
          onClick={() => search(text)}
          onPressEnter={() => search(text)}
        >
          {text}
        </SearchHistoryItem>
      ))}
    </div>
  );
}

export default SearchHistory;
