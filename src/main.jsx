import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './hooks/useGlobalReducer.jsx';
import Home from './pages/Home.jsx';
import DetailPage from './components/DetailPage.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);