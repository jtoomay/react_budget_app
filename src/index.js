import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css" // Bootstrap Import 
import { BudgetsProvider } from "./Contexts/BudgetContext"
 
ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider> 
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
