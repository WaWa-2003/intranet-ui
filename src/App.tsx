// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntranetUI from './intranet/IntranetUI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/intranet" />} />
        <Route path="/intranet/*" element={<IntranetUI />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
