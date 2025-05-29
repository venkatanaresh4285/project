import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormFillPage from './pages/FormFillPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<FormBuilderPage />} />
        <Route path="/builder/:formId" element={<FormBuilderPage />} />
        <Route path="/form/:formId" element={<FormFillPage />} />
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Router>
  );
}

export default App;