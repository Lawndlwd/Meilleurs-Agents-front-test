/* eslint-disable no-unused-vars */
import './Header.css';

import logo from 'assets/logo.svg';
import message from 'assets/message.svg';
import { Button } from 'components/Button/Button';
import { Search } from 'components/Search/Search';
import useWindowDimensions from 'hooks/Dementions';
import React from 'react';
import { useAgent } from 'store/agent';
export const Header = ({
  onAgentChange,
  value,
  handleChange,
  searchTerm,
}: {
  onAgentChange: (value: string) => void;
  value: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}) => {
  const { state: agentState } = useAgent();
  const [messageunreded, messageunrededSet] = React.useState('0');
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    const agent = agentState.agents.find((agent) => agent.id.toString() === value);

    agent && messageunrededSet(agent.unread_messages.toString());
  }, [agentState, value]);
  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onAgentChange(e.target.value);
  };

  return (
    <nav className="Header">
      <div className="Header_logo" aria-hidden>
        <img className="logo" src={logo} alt="logo" />
      </div>

      {width > 720 && (
        <div>
          <Search
            label="Search"
            placeHolder="Search"
            handleChange={handleChange}
            searchTerm={searchTerm}
          />
        </div>
      )}

      <section className="Header_options">
        <Button messageunreded={messageunreded} icon={message} />
        <select
          name="agents"
          id="agent"
          onChange={(e) => handleAgentChange(e)}
          className="select"
          value={value as string}>
          {agentState.agents.map((agent) => (
            <option value={agent.id} key={agent.id}>
              {agent.name.replace('#1', '')}
            </option>
          ))}
        </select>
      </section>
    </nav>
  );
};
