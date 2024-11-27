import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Styling
import './index.css'

// App
import NoteApp from './composition/NoteApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NoteApp />
  </StrictMode>,
)
