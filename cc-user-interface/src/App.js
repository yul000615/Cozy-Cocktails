import React, {useState,useEffect} from 'react'; 
import AppContext from './AppContext';
import './App.css';
import Home from './pages/home';
import Contact from './pages/contact';
import Home2 from './pages/home2';
import SignUp from './pages/signup';
import Login from './pages/login';
import MyAccount from './pages/myAccount';
import CreateRecipe from './pages/createRecipe';
import RecipeList from './pages/recipeList';
import ViewRecipe from './pages/detailedRecipe';
import UpdateAccount from './pages/updateAccount';
import ResetPassword from './pages/resetPassword';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

    function App() {
      const [accessToken, setAccessToken] = useState('no token')
    
      const tokenHandler = {
        token: accessToken,
        setAccessToken,
        refresh,
        logout
      }

      async function refresh() {
        console.log("refresh attempt")
        try {
          const response = await fetch("https://localhost:7268/api/Authentication/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            credentials: "include",
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setAccessToken(data.accessToken);
          } else {
            setAccessToken('');
          }
        } catch (error) {
        }
      }

      async function logout() {
        try {
          const response = await fetch("https://localhost:7268/api/Authentication/logout", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${tokenHandler.token}`
            },
            credentials: "include",
          });
    
          tokenHandler.setAccessToken('no token');
          return true;
        } catch (error) {
          return false;
        }
    }
    
      return (
        <AppContext.Provider value={tokenHandler}>
          <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/home2' element={<Home2 />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/myAccount' element={<MyAccount />} />
                <Route exact path='/createRecipe' element={<CreateRecipe />} /> 
                <Route exact path='/recipeList' element={<RecipeList />} /> 
                <Route exact path='/detailedRecipe' element={<ViewRecipe />} />
                <Route exact path='/updateAccount' element={<UpdateAccount />} /> 
                <Route exact path='/resetPassword' element={<ResetPassword />} /> 
            </Routes>
        </Router>
        </AppContext.Provider>
      );
    }
    export default App;