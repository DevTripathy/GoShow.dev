import React, { useState, useEffect } from 'react'
import BlurCircle from './BlurCircle'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DateSelect = ({id}) => {

   const [selected, setSelected] = useState(null);
   const[visibleDates, setVisibleDates] = useState([])
   const [highlightedDates, setHighlightedDates] = useState([]);
   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

   const navigate = useNavigate();

   useEffect(() => {
      const fetchShowDates = async () => {
         try {
            const { data } = await axios.get(`${backendUrl}/api/show/${id}`, {
               withCredentials: true
            });
            if (data.success) {
               const availableDates = Object.keys(data.dateTime).map(date => ({
                  iso: date,
                  display: new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
               }));
               setVisibleDates(availableDates);
            }
         } catch (error) {
            console.error('Error fetching show dates:', error);
         }
      };

      if (id) {
         fetchShowDates();
      }
   }, [id, backendUrl]);


  const handleDateClick = (date) => {
  setSelected(date.iso);
  setHighlightedDates([date.iso]);
};

   const onBookHandler = ()=>{
      if(!selected)
      {
         return toast('Please select a Date')
      }
      navigate(`/movies/${id}/${selected}`)
      scrollTo(0,0)
   }

  return (
    <div id='dateSelect' className='pt-30'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border-primary/20 rounded-lg'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='100px' right='0px' />
        <div>
          <p className='text-lg font-semibold'>Choose Date</p>
          <div className='flex items-center gap-6 text-sm mt-5'>
            
            <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
              {visibleDates.map(date => (
                <button
                  key={date.iso}

                  onClick={() => handleDateClick(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${highlightedDates.includes(date.iso) ? "bg-primary text-white" : "border border-primary/70"}`}
                >
                  <span>{date.display.split(' ')[0]}</span>
                  <span>{date.display.split(' ')[1]}</span>
                </button>
              ))}

            </span>

          
          

      </div>
    </div><button onClick={onBookHandler} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
        Book Now
      </button>

      </div>
    </div>
  )
}

export default DateSelect;