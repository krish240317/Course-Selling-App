import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AppWrapper = ({ children }) => {

    const authStatus = useSelector((state) => state.auth.status)
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myFunction = async () => {
        const excludedPaths = authStatus ? ["/login", "/signup"] : ["/", "/login", "/signup", "/uploadvideo"];   
             if (!excludedPaths.includes(location.pathname)) {

            console.log("✅ Running function on:", location.pathname);
            const token = localStorage.getItem("accessToken");
            try {                
                const response = await axios.get(
                    `${String(import.meta.env.VITE_API_URL)}/verify`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
                if (response.status === 200) {
                    console.log("✅ JWT verified successfully.");
                }
            } catch (error) {

                if (error.response.status === 401) {
                    console.log("❌ JWT verification failed. Logging out...");
                    dispatch(logout())
                    navigate("/login");
                } else {
                    console.error("⚠️ An error occurred during verification:", error.message);
                }
            }

        } else {
            console.log("⏭️ Skipped function on:", location.pathname);
        }
    };

    useEffect(() => {
        myFunction();
    }, [location.pathname]);

    return <>{children}</>;
};

export default AppWrapper;
