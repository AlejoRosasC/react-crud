import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from './components/Users';
import Navbar from './components/Navbar';
import Post from './components/Post';
import Request from './components/Request';
import Photo from './components/Photo';

function App() {
  return (
    <Router>
    <Navbar />
    <div className='container p-2'>
      <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/photo" element={<Photo/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/request" element={<Request/>}/>
        </Routes>
    </div>
  </Router>
  );
}

export default App;
