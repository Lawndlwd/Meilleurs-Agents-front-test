import './Button.css';

import React from 'react';
export const Button = ({
  messageunreded,
  icon,
}: {
  messageunreded: string;
  icon?: any;
}) => {
  return (
    <div
      role="button"
      className="Button"
      style={{ backgroundColor: messageunreded === '0' ? '#777' : '' }}>
      {icon && <img className="Button_logo" src={icon} alt="message" />}
      <span>{messageunreded}</span>
    </div>
  );
};
