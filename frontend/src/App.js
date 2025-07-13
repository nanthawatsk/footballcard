import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import Login from'./pages/Login';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import UserFavorites from './pages/Favorite';
import MyCollections from './pages/MyCollections';
import CollectionDetailPage from './pages/CollectionDetail';
import NewRelease from './pages/NewRelease';
import SearchPage from './pages/SearchPage';
import RequestPage from './pages/RequestPage';





function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/index" element={<Header />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<UserFavorites/>} />
          <Route path="/mycollections" element={<MyCollections/>} />
          <Route path="/mycollections/:collectionId" element={<CollectionDetailPage/>} />
          <Route path="/newrelease" element={<NewRelease/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/request" element={<RequestPage />} />
        </Routes>
    </Router>
  );
}

export default App;
