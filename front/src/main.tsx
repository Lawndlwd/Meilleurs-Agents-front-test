import './index.css';
import 'virtual:windi.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AgentContextProvider } from './store/agent';

ReactDOM.render(
  <React.StrictMode>
    <AgentContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AgentContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
