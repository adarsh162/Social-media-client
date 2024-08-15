import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { Home, Login } from '@mui/icons-material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from 'theme';
import RequestPage from 'scenes/requestPage';
function App() {
  //useSelector is used for accesing state stored in redux store
  const mode = useSelector((state) => state.mode);
  //useMemo calculates values of function and reuses it until dependencies change
  //CssBaseline provides a elegant baseline to build application upon
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' 
              element={ isAuth ? <Navigate to="/home"/> : <LoginPage />} />
            <Route path='/home' 
              element={isAuth ?<HomePage /> : <Navigate to="/"/>} />
            <Route path='/profile/:userId' 
              element={isAuth ? <ProfilePage /> : <Navigate to="/"/>} />
            <Route path='/notification' 
              element={isAuth ? <RequestPage/> : <Navigate to="/"/>} />
          </Routes>
          
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
