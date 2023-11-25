import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import AppContext from "../AppContext"

export default function Logout() {
    const context = useContext(AppContext);
    const [logoutComplete, setLogoutComplete] = useState(false);

    async function logout() {
        const logoutSuccessful = await context.logout();
        setLogoutComplete(logoutSuccessful);
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