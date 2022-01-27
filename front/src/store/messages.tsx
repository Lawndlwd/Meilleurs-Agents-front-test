/* eslint-disable no-unused-vars */
import { IMessage } from 'interfaces/types';
import React, { useContext } from 'react';

export type Actions = { type: 'SET_MESSAGES'; payload: Array<IMessage> };
export type Dispatch = (action: Actions) => void;

export const initialMessageState: { messages: Array<IMessage> } = { messages: [] };
export type State = typeof initialMessageState;
const messageContext = React.createContext<{
  state: { messages: IMessage[] };
  dispatch: Dispatch;
}>({
  state: { messages: [] },
  dispatch: (action: Actions) => [],
});

export function messageReducer(state: State, action: Actions) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return {
        messages: action.payload,
      };

    default:
      return state;
  }
}
export const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(messageReducer, initialMessageState);
  return (
    <messageContext.Provider value={{ state, dispatch }}>
      {children}
    </messageContext.Provider>
  );
};

export function useMessage() {
  const context = useContext(messageContext);
  if (!context) throw new Error('Please use useMessage in messageContext provider ');
  return context;
}
export default messageContext;
