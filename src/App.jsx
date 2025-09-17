import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import FormsList from './components/FormsList'
import FormBuilder from './components/FormBuilder'
import FormViewer from './components/FormViewer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/forms" replace />} />
            <Route path="/forms" element={<FormsList />} />
            <Route path="/builder" element={<FormBuilder />} />
            <Route path="/builder/:formId" element={<FormBuilder />} />
            <Route path="/form/:formId" element={<FormViewer />} />
            <Route path="*" element={<Navigate to="/forms" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App
