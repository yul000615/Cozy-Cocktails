import React from 'react';
import './App.css';
import Home from './pages/home';
import SignUp from './pages/signup';
import CreateRecipe from './pages/createRecipe';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/createRecipe' element={<CreateRecipe />} />
        </Routes>
    </Router>
  );
}

export default App;
