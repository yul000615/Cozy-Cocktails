import React from 'react';
import './App.css';
import Home from './pages/home';
import Home2 from './pages/home2';
import SignUp from './pages/signup';
import Login from './pages/login';
import MyAccount from './pages/myAccount';
import CreateRecipe from './pages/createRecipe';
import UpdateAccount from './pages/updateAccount';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home2' element={<Home2 />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/myAccount' element={<MyAccount />} />
            <Route exact path='/createRecipe' element={<CreateRecipe />} /> 
            <Route exact path='/updateAccount' element={<UpdateAccount />} /> 
        </Routes>
    </Router>
  );
}

export default App;