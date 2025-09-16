import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
     const {token} = useContext(AuthContext);
     const navigate = useNavigate();

     useEffect(()=> {
        if(!token) {
            navigate('/login')
        }
     }, [token, navigate])

     return token ? <Outlet/> : null
}

export default PrivateRoute;