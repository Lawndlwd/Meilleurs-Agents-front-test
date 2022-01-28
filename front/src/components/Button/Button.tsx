import './Button.css';

import message from 'assets/message.svg';
import React from 'react';
export const Button = ({ messageunreded }: { messageunreded: number }) => {
  return (
    <div
      className="Button"
      style={{ backgroundColor: messageunreded === 0 ? '#777' : '' }}>
      <img className="Button_logo" src={message} alt="message" />
      <span>{messageunreded}</span>
    </div>
  );
};
