import './App.css';

import { Details } from 'components/Detail/Details';
import { Messages } from 'components/Message/Messages';
import { IMessage } from 'interfaces/types';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { useAgent } from './store/agent';
import { useMessage } from './store/messages';

function App() {
  const { state, dispatch } = useMessage();
  const navigate = useNavigate();
  const { dispatch: agentListDispatch } = useAgent();
  const [chosenAgent, chosenAgentSet] = React.useState<string | null>(null);
  const callback = React.useCallback(async () => {
    const responseAgents = await fetch(`http://localhost:8080/realtors`);
    const jsonAgents = await responseAgents.json();
    agentListDispatch({
      type: 'SET_AGENTS',
      payload: jsonAgents.map((item: IMessage) => {
        return item;
      }),
    });
    !chosenAgent && chosenAgentSet(`${jsonAgents[0].id}`);

    const responseMessages =
      chosenAgent &&
      (await fetch(`http://localhost:8080/realtors/${chosenAgent}/messages`));
    const jsonMessages = responseMessages && (await responseMessages.json());
    jsonMessages &&
      dispatch({
        type: 'SET_MESSAGES',
        payload: jsonMessages.map((item: IMessage) => {
          return item;
        }),
      });
  }, [chosenAgent]);
  React.useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className="App">
      <Header
        onAgentChange={(value) => {
          chosenAgentSet(value);
          navigate(`/realtors/${value}`);
        }}
      />
      <Routes>
        <Route
          path="realtors/:realtors_id"
          element={<Messages messages={state.messages} />}
        />
        <Route path="realtors/:realtors_id/messages/:messages_id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
