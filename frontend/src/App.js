import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from "./context/auth-context";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider>
          <MainNavigation />
          <main>
            <Switch>
              <Redirect from="/" to="/auth" exact></Redirect>
              <Route path="/auth" component={AuthPage}></Route>
              <Route path="/events" component={EventsPage}></Route>
              <Route path="/bookings" component={BookingsPage}></Route>
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
