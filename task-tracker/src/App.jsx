import { useState } from 'react';
import { NavbarStyles } from './NavbarStyles';
import { GlobalDashboard } from './GlobalDashboard';
import { SignUp } from './SignUp';
import { LogIn } from './LogIn';
import axios from 'axios';
import { DashboardScreen } from './DashboardScreen';


function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));


  return (
    <>
      <NavbarStyles setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {
        isLoggedIn ? (
          <GlobalDashboard setCurrentView={setCurrentView} />
        ) : (
          currentView === "login" ? <LogIn setIsLoggedIn={setIsLoggedIn} setCurrentView={setCurrentView} /> : <SignUp changeView={setCurrentView} setIsLoggedIn={setIsLoggedIn} />
        )
      }




    </>
  )
}

export default App
