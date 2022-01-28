import { Details } from 'components/Detail/Details';
import useWindowDimensions from 'hooks/Dementions';
import { IMessage } from 'interfaces/types';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Message } from './Message';

export const Messages = ({
  messages,
  searchTerm,
}: {
  messages: IMessage[];
  searchTerm: string;
}) => {
  let navigate = useNavigate();

  const { width } = useWindowDimensions();
  const { realtors_id } = useParams();

  React.useEffect(() => {
    if (width > 720 && messages.length)
      navigate(`/realtors/${realtors_id}?id=${messages[0].id}`);
  }, [width]);
  return (
    <main className="layout">
      <aside
        className={`  ${
          width > 720 && width < 1140
            ? ' Message_tablet '
            : width > 1140
            ? 'Message_desktop'
            : 'Messages'
        }`}>
        {messages.length ? (
          messages.map((message) => <Message key={message.id} message={message} />)
        ) : (
          <p>
            No messages found for <span className="searchTerm">{`"${searchTerm}"`}</span>
          </p>
        )}
      </aside>
      <Details />
    </main>
  );
};
