import '../Message/Message.css';

import React from 'react';
export const ShortText = ({
  text,
  read,
  long,
}: {
  text: string;
  read: boolean;
  long: number;
}) => {
  const position = text.indexOf(' ', long);
  const displayText = text.substring(0, position) + '...';

  return (
    <p role="article" className="ShortText" style={{ color: read ? '#777' : '' }}>
      {displayText}
    </p>
  );
};
