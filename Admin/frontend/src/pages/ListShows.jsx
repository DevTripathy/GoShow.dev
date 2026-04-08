import React, { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../components/Loading'
import Title from '../components/Title'
import { dateFormat } from '../lib/dateFormat'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListShows = () => {

  const currency=import.meta.env.VITE_CURRENCY
  
  const[shows,setShows]=useState([])
  const[loading,setLoading]=useState(true)

  const getAllShows = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/admin/dashboard`, { withCredentials: true });
      setShows(data.dashboardData.activeShows || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shows:", error);
      setLoading(false);
    }
  }

  const deleteShow = async (showId) => {
    if (!window.confirm("Are you sure you want to delete this show?")) return;

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/admin/delete-show/${showId}`, {}, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        getAllShows(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting show:", error);
      toast.error(error.response?.data?.message || "Failed to delete show");
    }
  }
  useEffect(()=>{
    getAllShows();
  },[]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />

      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
              <th className='p-2 font-medium'>Actions</th>
            </tr>
          </thead>

          <tbody className='text-sm font-light'>
            {shows.map((show, index)=>(
              <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10 '>
                <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                <td className="p-2">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteShow(show._id)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  ) : <Loading />
} 

export default ListShows