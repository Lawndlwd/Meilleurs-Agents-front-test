import React from 'react';
import { State } from 'store/messages';

import { Message } from './Message';

export const Messages = ({ messages }: State) => {
  return (
    <div className="Messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
