import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [shows, setShows] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/admin/isAuth`, {}, {
          withCredentials: true
        });
        if (response.data.success) {
          setIsAuthenticated(true);
          setIsVerified(response.data.isVerified || false);
          // Fetch admin data
          const adminResponse = await axios.get(`${backendUrl}/api/admin/data`, {
            withCredentials: true
          });
          if (adminResponse.data.success) {
            setAdminData(adminResponse.data.adminData);
          }
        } else {
          setIsAuthenticated(false);
          setIsVerified(false);
          setAdminData(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsVerified(false);
        setAdminData(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, { email, password }, { withCredentials: true });
      if (response.data.success) {
        setIsAuthenticated(true);
        setIsVerified(response.data.isVerified || false);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/admin/logout`, {}, { withCredentials: true });
      if (response.data.success) {
        toast.success('Logged out successfully');
      } else {
        toast.error(response.data.message || 'Logout failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setIsAuthenticated(false);
    setIsVerified(false);
    setAdminData(null);
  };



  const fetchShows = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/show/all`)
            if (data.success) {
                setShows(data.shows);
            } else {
                //console.error(data.message);
            }
        } catch (error) {
            console.error("Failed to fetch shows:", error);
        }
    }

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`);
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error fetching dashboard data");
    }
  };

    useEffect(() => {
        fetchShows();
        fetchDashboardData();
    }, [])


  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isVerified, loading, login, logout, setIsVerified, adminData, shows, image_base_url, fetchShows, dashboardData, fetchDashboardData }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
