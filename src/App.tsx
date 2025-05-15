import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PointsTable from './pages/PointsTable';
import Schedule from './pages/Schedule';
import Footer from './components/Footer';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/points-table" element={<PointsTable />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;