import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './pages/context/UserContext.jsx'
import { ConversationProvider } from './pages/context/conversationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ConversationProvider>
    <App />
    </ConversationProvider>
    </UserProvider>
  </StrictMode>,
)
