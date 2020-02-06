import React from 'react';
import { withFocusable } from 'react-tv-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const HistoryItem = ({ focused, setFocus, focusPath, text, search }) => {
  let className = 'historyItem';
  className += (focused) ? ' focused' : ' unfocused';

  return (
    <button
      className={className}
      onClick={() => search(text)}
    >
      <FontAwesomeIcon className='icon' icon={faClock} />
      <span>{text}</span>
    </button>
  );
}

const SearchHistory = ({history, search}) => {

  const SearchHistoryItem = withFocusable(HistoryItem);

  return (
    <div className='history'>
      { history && history.length > 0 && history.map((text, index) => (
        <SearchHistoryItem
          key={`history-item-${index}`}
          focusPath={`history-item-${index}`}
          text={text}
          search={search}
        />
      ))}
    </div>
  );
}

export default SearchHistory;
