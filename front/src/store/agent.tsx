/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { IAgent } from 'interfaces/types';
import React, { useContext } from 'react';

export type Actions = { type: 'SET_AGENTS' | 'UPDATE_AGENTS'; payload: any };
export type Dispatch = (action: Actions) => void;

export const initialAgentState: { agents: Array<IAgent> } = { agents: [] };
export type State = typeof initialAgentState;

const agentContext = React.createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: initialAgentState,
  dispatch: (action: Actions) => [],
});

export function agentReducer(state: State, action: Actions) {
  switch (action.type) {
    case 'SET_AGENTS':
      return {
        agents: action.payload,
      };
    case 'UPDATE_AGENTS':
      const updatedData = state.agents.map((agent) => {
        if (agent.id.toString() === action.payload.agent_id) {
          console.log('agent_id', action.payload.agent_id);
          const updatedMessage = agent.messages.map((message) => {
            if (message.id.toString() === action.payload.message_id.toString()) {
              console.log('message_id', action.payload.message_id);
              console.log({ ...message, read: true });
              return { ...message, read: true };
            } else {
              return message;
            }
          });
          console.log('updatedMessage', updatedMessage);
          return {
            ...agent,
            unread_messages: agent.unread_messages - 1,
            messages: updatedMessage,
          };
        } else return agent;
      });
      console.log(updatedData);
      return {
        agents: updatedData,
      };
    default:
      return state;
  }
}
export const AgentContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(agentReducer, initialAgentState);
  return (
    <agentContext.Provider value={{ state, dispatch }}>{children}</agentContext.Provider>
  );
};

export function useAgent() {
  const context = useContext(agentContext);
  if (!context) throw new Error('Please use useAgent in agentContext provider ');
  return context;
}

export default agentContext;
