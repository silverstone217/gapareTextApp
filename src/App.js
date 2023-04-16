import './App.css';
import { useState, useEffect } from "react";
import Profil from './pages/Profil';
import Sign from './pages/Sign';
import Main from './pages/Main';
import NoPage from './pages/NoPage';
import { auth} from './Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
       setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
    });
  }, [])

  return (
    <BrowserRouter>
    <Routes>
      {
        isLoggedIn ?
        <>
          <Route index element={<Main/>} />
          <Route path="main" element={<Main/>} />
          <Route path="profile" element={<Profil />} />
          <Route path="*" element={<NoPage />} />
        </>
        :
        <>
          <Route index element={<Sign />} />
          <Route path="sign" element={<Sign />} />
          <Route path="*" element={<NoPage />} />
       </>
      }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
