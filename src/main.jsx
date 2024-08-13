import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { EmpoloyeProvider } from './EmpContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EmpoloyeProvider>
        <App />
      </EmpoloyeProvider>
    </BrowserRouter>
  </StrictMode>,
)
