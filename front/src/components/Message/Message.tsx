import './Message.css';

import messageSvg from 'assets/message-colored.svg';
import messageReadSvg from 'assets/message-readed.svg';
import phoneSvg from 'assets/phone.svg';
import phoneReadSvg from 'assets/phone-readed.svg';
import { ShortText } from 'components/ShortText/ShortText';
import useWindowDimensions from 'hooks/Dementions';
import { updateMessage } from 'http/http';
import { IMessage } from 'interfaces/types';
import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAgent } from 'store/agent';
import { dateConverter } from 'utils/Date';
import { substring } from 'utils/substr';
export const Message = ({ message }: { message: IMessage }) => {
  let navigate = useNavigate();
  const { dispatch } = useAgent();
  const { realtors_id } = useParams();
  const { width } = useWindowDimensions();
  const [searchParams] = useSearchParams();

  const openedMessage = searchParams.get('id');
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

  const updateNavigate = async () => {
    if (!message.read && realtors_id) {
      const json = await updateMessage(realtors_id, message.id);
      dispatch({
        type: 'UPDATE_AGENTS',
        payload: {
          agent: json,
          message_id: message.id.toString(),
          agent_id: realtors_id,
        },
      });
    }
    if (width > 720) navigate(`/realtors/${realtors_id}?id=${message.id}`);
    else navigate(`/realtors/${realtors_id}/messages/${message.id}`);
  };

  return (
    <section
      className="Message"
      style={{
        color: message.read ? '#777' : '',
        backgroundColor: openedMessage === message.id.toString() ? '#eee' : '',
      }}
      onClick={updateNavigate}
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
      <section className="Message_section">
        <header className="Message_head">
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
          <time className="Message_time" style={{ color: message.read ? '#777' : '' }}>
            {date}
          </time>
        </header>
        <main className="Message_body">
          <p className="Message_subtitle">{message.type && messageType(message.type)}</p>
          {message.type === 'phone' ? (
            <p className="ShortText" style={{ color: message.read ? '#777' : '' }}>
              {message.subject}
            </p>
          ) : (
            <ShortText text={message.body} read={message.read} />
          )}
        </main>
      </section>
    </section>
  );
};
