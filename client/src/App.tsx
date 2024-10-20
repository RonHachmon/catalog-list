import Dashboard from './components/Dashboard'
import CatalogForm from './components/CatalogForm'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CatalogContextProvider } from './context/catalogContext';
import './App.css'

function App() {
  return (
    <CatalogContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard  />} />
          <Route path="/catalog/create" element={<CatalogForm />} />
          <Route path="/catalog/edit/:catalogId" element={<CatalogForm />} />

        </Routes>
      </Router>
    </CatalogContextProvider>
  )
}

export default App
