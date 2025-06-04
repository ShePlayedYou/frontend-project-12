import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo } from './Components/Pages.jsx';
import { Page404 } from './Components/Page404.jsx';
import { LoginPage } from './Components/LoginPage.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
