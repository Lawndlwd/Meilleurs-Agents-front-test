import './index.css';
import 'virtual:windi.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AgentContextProvider } from './store/agent';
import { MessageContextProvider } from './store/messages';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AgentContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </AgentContextProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
