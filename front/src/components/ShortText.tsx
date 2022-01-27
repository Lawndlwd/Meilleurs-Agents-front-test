import './Message/Message.css';

import React from 'react';
export const ShortText = ({ text, read }: { text: string; read: boolean }) => {
  const getChunks = () => {
    const position = text.indexOf(' ', 75);
    if (text.length <= 75 || position === -1) return [text];
    return [text.substring(0, position), text.substring(position)];
  };
  const isTooLong = () => {
    return getChunks().length === 2;
  };
  const displayText = () => {
    if (!isTooLong()) return getChunks().join(' ');
    return getChunks()[0] + '...';
  };
  return (
    <p className="ShortText" style={{ color: read ? '#777' : '' }}>
      {displayText()}
    </p>
  );
};
