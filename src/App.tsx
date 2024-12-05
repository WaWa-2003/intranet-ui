// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntranetUI from './intranet/IntranetUI';
import CardManager from './CRUD/components/CardManager';
import CardCreate from './CRUD/components/CardCreate';
import CardAllShow from './CRUD/components/CardAllShow';
import FromCRUD from './shiprush/components/From/FromCRUD';
import ToCRUD from './shiprush/components/To/ToCRUD';
import UserCRUD from './shiprush/components/User/UserCRUD';
import ShipRushUI from './shiprush/ShiprushUI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/intranet" />} />
        <Route path="/intranet/" element={<IntranetUI />} />
        <Route path="/intranet-systems-data/*" element={<CardManager />} />
        <Route path="/intranet-systems-data/create" element={<CardCreate />} />
        <Route path="/intranet-systems" element={<CardAllShow />} />
        <Route path="intranet/Shiprush/" element={<ShipRushUI />} />
        <Route path="/Shiprush/" element={<ShipRushUI />} />
        <Route path="/Shiprush/from/" element={<FromCRUD />} />
        <Route path="/Shiprush/to/" element={<ToCRUD />} />
        <Route path="/Shiprush/user/" element={<UserCRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
