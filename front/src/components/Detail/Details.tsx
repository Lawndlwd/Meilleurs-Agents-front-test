import './Details.css';

import messageReadSvg from 'assets/message-readed.svg';
import phoneReadSvg from 'assets/phone-readed.svg';
import useWindowDimensions from 'hooks/Dementions';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAgent } from 'store/agent';
import { fullDate } from 'utils/Date';

type IDetailsParams = { messages_id: string; realtors_id: string };

export const Details = () => {
  const { width } = useWindowDimensions();
  const [searchParams] = useSearchParams();
  const { realtors_id } = useParams<IDetailsParams>();
  const messages_id = width > 720 ? searchParams.get('id') : useParams().messages_id;
  const { state } = useAgent();
  const agent = state.agents.find((item) => item.id.toString() === realtors_id);

  const message =
    agent && agent.messages.find((item) => item.id.toString() === messages_id);
  const fullname = () =>
    message && `${message.contact.firstname} ${message.contact.lastname}`;

  return (
    <div className="noname">
      {message && (
        <>
          <header className="Details">
            <img
              className="Message_logo"
              src={message.type === 'phone' ? phoneReadSvg : messageReadSvg}
              alt=""
              width="20"
            />
            <section className="Details_section">
              <h3>{fullname()}</h3>
              <div className="Details_contact">
                <p className="Details_contact-name">Email</p>
                <a
                  href={`mailto:${message.contact.email}`}
                  target="_blank"
                  className="Details_contact-value"
                  rel="noreferrer">
                  {message.contact.email}
                </a>
              </div>
              <div className="Details_contact">
                <p className="Details_contact-name">Phone</p>
                <a
                  href={`tel:${message.contact.phone}`}
                  target="_blank"
                  className="Details_contact-value"
                  rel="noreferrer">
                  {message.contact.phone}
                </a>
              </div>
            </section>
          </header>
          <article className="Details">
            <main className="Details_section">
              <h3>{fullname()}</h3>
              <p className="subDetails">{fullDate(message.date)}</p>
              <p className="Details_body">{message.body}</p>
            </main>
          </article>
        </>
      )}
    </div>
  );
};
