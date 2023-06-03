
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginV2';
import SignupPage from './pages/SignupPageV2';
import AllProfiles from './pages/AllProfiles';
import Profile from './pages/Profile';
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './context/AuthContext'
import Chat from './pages/Chat';
import Rev from './pages/Reviews';
import Cam2 from './components/Cam2';
import Notifications from './pages/Notifications';

function App() {
  return (
  <div className='App'>
    <BrowserRouter>
    <AuthProvider>
      <Header/>
        <Routes>
          <Route element={<PrivateRoute/>} path="/home">
          </Route>
          <Route element={<LoginPage/>} path="/login"/>
          <Route element={<SignupPage/>} path="/signup"/>
          <Route element={<Profile/>} path="/profile"/>
          <Route element={<AllProfiles />} path="/profiles"/>
          <Route element={<Chat />} path="/chat/:room_name/:user2"/>
          <Route element={<Rev />} path = "/reviews" />
          <Route element={<Cam2/>} path="/webcam/:room_name" />
          <Route element={<Notifications/>} path="/notifications" />

        </Routes>
    </AuthProvider>
    </BrowserRouter> 
  </div>
  );
}

export default App;
