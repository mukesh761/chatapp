import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './pages/context/userContext.jsx'
import { ConversationProvider } from './pages/context/conversationContext.jsx'
import { SocketProvider } from './pages/context/socket.io.context.jsx'

createRoot(document.getElementById('root')).render(

    <UserProvider>
      <ConversationProvider>
    <SocketProvider>
    <App />
    </SocketProvider>
    </ConversationProvider>
    </UserProvider>
  
)
