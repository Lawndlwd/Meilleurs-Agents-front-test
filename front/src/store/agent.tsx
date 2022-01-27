/* eslint-disable no-unused-vars */
import { IAgent } from 'interfaces/types';
import React, { useContext } from 'react';

export type Actions = { type: 'SET_AGENTS'; payload: Array<IAgent> };
export type Dispatch = (action: Actions) => void;

export const initialAgentState: { agents: Array<IAgent> } = { agents: [] };
export type State = typeof initialAgentState;
const agentContext = React.createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: { agents: [] },
  dispatch: (action: Actions) => [],
});

export function agentReducer(state: State, action: Actions) {
  switch (action.type) {
    case 'SET_AGENTS':
      return {
        agents: action.payload,
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
