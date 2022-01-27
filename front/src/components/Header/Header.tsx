/* eslint-disable no-unused-vars */
import './Header.css';

import React, { useContext } from 'react';

import logo from '../../assets/logo.svg';
import agentContext, { useAgent } from '../../store/agent';
import messageContext, { useMessage } from '../../store/messages';
import { Button } from '../Button/Button';
export const Header = ({ onAgentChange }: { onAgentChange: (value: string) => void }) => {
  const { state } = useMessage();
  const { state: agentState } = useAgent();
  const [messageunreded, messageunrededSet] = React.useState(0);
  React.useEffect(() => {
    messageunrededSet(state.messages.filter((message) => message.read === false).length);
  }, [state]);
  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onAgentChange(e.target.value);
  };

  return (
    <div className="Header">
      <div className="Header_logo">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="Header_options">
        <Button messageunreded={messageunreded} />
        <select name="agents" id="agent" onChange={(e) => handleAgentChange(e)}>
          {agentState.agents.map((agent) => (
            <option value={agent.id} key={agent.id}>
              {agent.name.replace('#10', '').replace('#1', '')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
