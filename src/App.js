import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Lists from './pages/Lists';
import Home from './pages/Home';
import Layout from './Components/Layout';

function App() {
  return (
    <Layout>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Layout>
  );
}

export default App;
