import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Login from'./Login';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/index" element={<Header />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Header />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
