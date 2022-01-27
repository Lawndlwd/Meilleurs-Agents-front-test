import './Message.css';

import { IMessage } from 'interfaces/types';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dateConverter } from 'utils/Date';
import { substring } from 'utils/substr';

import messageSvg from '../../assets/message-colored.svg';
import messageReadSvg from '../../assets/message-readed.svg';
import phoneSvg from '../../assets/phone.svg';
import phoneReadSvg from '../../assets/phone-readed.svg';
import { ShortText } from '../ShortText';
export const Message = ({ message }: { message: IMessage }) => {
  let navigate = useNavigate();
  const { realtors_id } = useParams();

  const fullname = () => `${message.contact.firstname} ${message.contact.lastname}`;
  const messageType = (messagetype: string) => {
    switch (messagetype) {
      case 'phone':
        return 'Message vocal sur votre vitrine Meilleurs Agents';
      case 'sms':
        return 'SMS sur votre vitrine Meilleurs Agents';
      case 'email':
        return 'Message sur votre vitrine Meilleurs Agents';

      default:
        return 'Message sur votre vitrine Meilleurs Agents';
    }
  };
  const date = dateConverter(message.date);

  return (
    <div
      className="Message"
      style={{ color: message.read ? '#777' : '' }}
      onClick={() => navigate(`/realtors/${realtors_id}/messages/${message.id}`)}
      aria-hidden="true">
      <img
        className="Message_logo"
        src={
          message.type === 'phone'
            ? message.read
              ? phoneReadSvg
              : phoneSvg
            : message.read
            ? messageReadSvg
            : messageSvg
        }
        alt=""
        width="20"
      />
      <div className="Message_section">
        <div className="Message_head">
          <h3
            className="Message_sender"
            style={{ fontWeight: message.read ? 'initial' : '' }}>
            {fullname()}
            {(message.type === 'sms' || message.type === 'phone') && (
              <span className="Message_phone">{` (${substring(
                message.contact.phone,
              )})`}</span>
            )}
          </h3>
          <span className="Message_time" style={{ color: message.read ? '#777' : '' }}>
            {date}
          </span>
        </div>
        <div className="Message_body">
          <p className="Message_subtitle">{message.type && messageType(message.type)}</p>
          {message.type === 'phone' ? (
            <p className="ShortText" style={{ color: message.read ? '#777' : '' }}>
              {message.subject}
            </p>
          ) : (
            <ShortText text={message.body} read={message.read} />
          )}
        </div>
      </div>
    </div>
  );
};
