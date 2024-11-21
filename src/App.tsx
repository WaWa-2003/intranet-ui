// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntranetUI from './intranet/IntranetUI';
import CardManager from './CRUD/components/CardManager';
import CardCreate from './CRUD/components/CardCreate';
import CardAllShow from './CRUD/components/CardAllShow';
import ShiprushApproval from './ship-rush/ShiprushApproval';
import FromCRUD from './shiprush/components/From/FromCRUD';
import ToCRUD from './shiprush/components/To/ToCRUD';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/intranet" />} />
        <Route path="/intranet/*" element={<IntranetUI />} />
        <Route path="/intranet-systems-data/*" element={<CardManager />} />
        <Route path="/intranet-systems-data/create" element={<CardCreate />} />
        <Route path="/intranet-systems" element={<CardAllShow />} />
        <Route path="/ShiprushApproval" element={<ShiprushApproval />} />
        <Route path="/ShiprushApproval/from/" element={<FromCRUD />} />
        <Route path="/ShiprushApproval/to/" element={<ToCRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
