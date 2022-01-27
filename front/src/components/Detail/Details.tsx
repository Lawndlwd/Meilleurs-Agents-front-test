import './Details.css';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useMessage } from 'store/messages';
import { fullDate } from 'utils/Date';

import messageReadSvg from '../../assets/message-readed.svg';
import phoneReadSvg from '../../assets/phone-readed.svg';
type IDetailsParams = { messages_id: string; realtors_id: string };
export const Details = () => {
  const { messages_id, realtors_id } = useParams<IDetailsParams>();
  const { state } = useMessage();

  const message = state.messages.find((item) => item.id.toString() === messages_id);
  const fullname = () =>
    message && `${message.contact.firstname} ${message.contact.lastname}`;

  const callback = React.useCallback(async () => {
    const response = await fetch(
      `http://localhost:8080/realtors/${realtors_id}/messages/${messages_id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ read: true }),
      },
    );
    console.log(response.json);
  }, []);
  React.useEffect(() => {
    callback();
  }, []);

  return (
    <div>
      {message && (
        <>
          <div className="Details">
            <img
              className="Message_logo"
              src={message.type === 'phone' ? phoneReadSvg : messageReadSvg}
              alt=""
              width="20"
            />
            <div className="Details_section">
              <h3>{fullname()}</h3>
              <div className="Details_contact">
                <p className="Details_contact-name">Email</p>
                <p className="Details_contact-value">{message.contact.email}</p>
              </div>
              <div className="Details_contact">
                <p className="Details_contact-name">Phone</p>
                <p className="Details_contact-value">{message.contact.phone}</p>
              </div>
            </div>
          </div>
          <div className="Details">
            <div className="Details_section">
              <h3>{fullname()}</h3>
              <p className="subDetails">{fullDate(message.date)}</p>
              <p className="Details_body">{message.body}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
