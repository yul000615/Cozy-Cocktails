import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import AppContext from "../AppContext"

export default function Logout() {
    const context = useContext(AppContext)
    const [logoutComplete, setLogoutComplete] = useState(false);


    async function logout() {
        try {
          const response = await fetch("https://localhost:7268/api/Authentication/logout", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${context.token}`
            },
            credentials: "include",
          });
    
          context.setAccessToken('');
          setLogoutComplete(true);
        } catch (error) {
        }
    }

    return (
        <div>
            {logoutComplete ? (<ReturnToHome/>): (<button className="button" id="logoutBtn" onClick={logout}>Log Out</button>)}
        </div>
    )
}

function ReturnToHome() {
    return (<Navigate replace to="/"/>)
}