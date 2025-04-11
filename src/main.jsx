import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MiFelForm } from './MiFelForm'
import './index.css'
import 'leaflet/dist/leaflet.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MiFelForm />
  </StrictMode>,
)
