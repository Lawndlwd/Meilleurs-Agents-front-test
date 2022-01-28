import { Details } from 'components/Detail/Details';
import useWindowDimensions from 'hooks/Dementions';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { State } from 'store/messages';

import { Message } from './Message';

export const Messages = ({ messages }: State) => {
  let navigate = useNavigate();

  const { width } = useWindowDimensions();
  const { realtors_id } = useParams();

  React.useEffect(() => {
    if (width > 720) navigate(`/realtors/${realtors_id}?id=${messages[0].id}`);
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
        {messages.length &&
          messages.map((message) => <Message key={message.id} message={message} />)}
      </aside>
      <Details />
    </main>
  );
};
