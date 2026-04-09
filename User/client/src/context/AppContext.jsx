import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext();


export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);
    const [shows, setShows] = useState([]);

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    const getAuthStatus = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/getauthstatus`, {
                withCredentials: true
            });
            if (data.success) {
                const userRes = await axios.get(`${backendUrl}/api/user/getuser`, {
                    withCredentials: true
                });
                if (userRes.data.success) {
                    setIsLoggedIn(true);
                    setUserData(userRes.data.user);
                } else {
                    setIsLoggedIn(false);
                    setUserData(false);
                }
            } else {
                setIsLoggedIn(false);
                setUserData(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUserData(false);
            toast.error("Network Error");
        }
    }

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/getuser`, {
                withCredentials: true
            });
            data.success ? setUserData(data.user) : toast.error(data.message);
        } catch (error) {
            toast.error("Network Error");
        }
    }

    useEffect(() => {
        getAuthStatus();
    }, [])

    const logout = async () => {
        try {
            await axios.post(`${backendUrl}/api/auth/user/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUserData(false);
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        }
    }



    const fetchShows = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/show/all`)
            if (data.success) {
                setShows(data.shows);
            } else {
                toast.error("Failed to fetch shows", data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch shows", error);
        }
    }



    useEffect(() => {
        fetchShows();
    }, [])

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserDetails,
        image_base_url,
        logout,
        shows
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);