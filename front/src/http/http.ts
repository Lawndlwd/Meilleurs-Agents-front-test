import { IAgent, IMessage } from 'interfaces/types';

export const getAgents = async (): Promise<Array<IAgent>> => {
  const response = await fetch(`http://localhost:8080/realtors`);
  const json: Array<IAgent> = await response.json();
  return json;
};

export const getMessages = async (agent_id: number): Promise<Array<IMessage>> => {
  const response = await fetch(
    `http://localhost:8080/realtors/${agent_id}/messages?sort=date%3Adesc&page=1&page_size=20`,
  );
  const json: Array<IMessage> = await response.json();
  return json;
};

export const updateMessage = async (
  realtors_id: string,
  message_id: number,
): Promise<Array<IMessage>> => {
  const response = await fetch(
    `http://localhost:8080/realtors/${realtors_id}/messages/${message_id}`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ read: true }),
    },
  );
  const json = await response.json();
  return json;
};
