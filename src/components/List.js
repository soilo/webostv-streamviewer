import React from 'react'

const List = ({ children }) => {
  const scrollRef = React.createRef();
  const content = scrollRef.current.content;
  const items = content.getElementsByClassName('item');
  const itemWidth = items[0].offsetWidth + 20;

  const scrollToMiddle = (index) => {
    content.scrollLeft = index * itemWidth;
  }

  return (
    <div ref={scrollRef}>
      {children}
    </div>
  )
}