import { BrowserRouter , Routes , Route } from 'react-router-dom';

import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Application from './pages/Application.js';
import ResumeUpload from './pages/ResumeUpload.js';
import Analytics from './pages/Analytics.js';
import Landing from './pages/Landing.js';
import Signup from './pages/Signup.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' 
      element={
      <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path='/application'
      element={
        <ProtectedRoute>
          <Application/>
        </ProtectedRoute>
      }/>
      <Route path='/resume'
      element={
        <ProtectedRoute>
          <ResumeUpload/>
        </ProtectedRoute>
      }/>
      <Route path='/analytics'
      element={
        <ProtectedRoute>
          <Analytics/>
        </ProtectedRoute>
      }/>
       <Route path="*" element={<Login />} />
    </Routes>
    </BrowserRouter>
    
   
  );
}

export default App;
