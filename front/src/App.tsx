import './App.css';

import { Details } from 'components/Detail/Details';
import { Messages } from 'components/Message/Messages';
import { getAgents, getMessages } from 'http/http';
import { IAgent } from 'interfaces/types';
import { Layout } from 'layout/default';
import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAgent } from 'store/agent';

function App() {
  const { dispatch, state } = useAgent();

  const navigate = useNavigate();
  const params = window.location.pathname.split('/')[2];

  const [chosenAgent, chosenAgentSet] = React.useState<string | null>(params);
  const messages = () => {
    const agent =
      chosenAgent && state.agents.find((item) => item.id.toString() === chosenAgent);
    return agent ? agent.messages : [];
  };
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
  }, [chosenAgent]);
  React.useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className="App">
      <Layout
        chosenAgent={chosenAgent}
        chosenAgentSet={(value) => {
          chosenAgentSet(value);
          navigate(`/realtors/${value}`);
        }}>
        <Routes>
          {state.agents.length && (
            <Route
              path="realtors/:realtors_id"
              element={<Messages messages={messages() || state.agents[0].messages} />}
            />
          )}
          <Route
            path="realtors/:realtors_id/messages/:messages_id"
            element={<Details />}
          />
          <Route path="/" element={<Navigate to="realtors/101" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
