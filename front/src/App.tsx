import loader from 'assets/loader.svg';
import { Details } from 'components/Detail/Details';
import { Messages } from 'components/Message/Messages';
import { getAgents, getMessages } from 'http/http';
import { IAgent, IMessage } from 'interfaces/types';
import { Layout } from 'layout/default';
import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAgent } from 'store/agent';

function App() {
  const { dispatch, state } = useAgent();

  const navigate = useNavigate();
  const params = window.location.pathname.split('/')[2];
  const [chosenAgent, chosenAgentSet] = React.useState<string | null>(params);

  const agent =
    chosenAgent && state.agents.find((item) => item.id.toString() === chosenAgent);
  const messages = agent ? agent.messages : [];

  //search
  const [searchResults, setSearchResults] = React.useState<Array<IMessage>>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = messages.filter(
      (message) =>
        message.contact.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.contact.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.body.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results);
  }, [searchTerm, messages]);

  // fetch API data
  const callback = React.useCallback(async () => {
    const json = await getAgents();
    const agents: Array<IAgent> = await Promise.all(
      json.map(async (agent: IAgent) => {
        const messages = await getMessages(agent.id);

        return {
          ...agent,
          messages,
        };
      }),
    );
    !chosenAgent && chosenAgentSet(params || agents[0].id.toLocaleString());

    dispatch({
      type: 'SET_AGENTS',
      payload: agents,
    });
  }, []);
  React.useEffect(() => {
    callback();
  }, [callback]);

  return (
    <Layout
      chosenAgent={chosenAgent}
      handleChange={handleChange}
      searchTerm={searchTerm}
      chosenAgentSet={(value) => {
        chosenAgentSet(value);
        navigate(`/realtors/${value}`);
      }}>
      {!state.agents.length && <img className="loader" src={loader} alt="loader" />}
      <Routes>
        {state.agents.length && (
          <Route
            path="realtors/:realtors_id"
            element={<Messages messages={searchResults || state.agents[0].messages} />}
          />
        )}
        <Route path="realtors/:realtors_id/messages/:messages_id" element={<Details />} />
        <Route path="/" element={<Navigate to="realtors/101" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
