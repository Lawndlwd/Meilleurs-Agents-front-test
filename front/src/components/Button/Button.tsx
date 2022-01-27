import './Button.css';

import React from 'react';

import message from '../../assets/message.svg';
export const Button = ({ messageunreded }: { messageunreded: number }) => {
  return (
    <div className="Button">
      <img className="Button_logo" src={message} alt="message" />
      <span>{messageunreded}</span>
    </div>
  );
};
