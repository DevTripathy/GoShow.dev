import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { dummyShowsData } from "../assets/assets";
import { useNavigate } from 'react-router-dom'
import "swiper/css";
import "swiper/css/pagination";
import "../styles/MovieSection.css";
import { useAppContext } from "../context/AppContext";

const MovieSection = () => {

   const { image_base_url, shows } = useAppContext();
   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

   const navigate = useNavigate()
   const swiperWrappedRef = useRef(null);

   function adjustMargin() {
      const screenWidth = window.innerWidth;
   }

   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 520);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, [])

   useEffect(() => {
      if (swiperWrappedRef.current && shows.length > 0) {
         swiperWrappedRef.current.update();
         swiperWrappedRef.current.pagination.render();
         swiperWrappedRef.current.pagination.update();
         swiperWrappedRef.current.slideTo(0); // Reset to first slide to sync pagination
      }
   }, [shows]);

   const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
   const [expandedIndex, setExpandedIndex] = useState(null);

   return (
      <div className="main">
         <div className="container">
            <Swiper modules={[Pagination, Autoplay]} grabCursor initialSlide={0} centeredSlides slidesPerView={1.3} speed={800} pagination={{ clickable: true }}

               autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
               }}
               loop={true}
               breakpoints={{
                  320: { spaceBetween: 40 },
                  650: { spaceBetween: 30 },
                  1000: { spaceBetween: 20 }
               }}
               onSwiper={(swiper) => {
                  swiperWrappedRef.current = swiper;
               }}

            >
               {shows.map((movie, index) => (
                  <SwiperSlide key={index}>
                     <img className="movie-poster" src={image_base_url + movie.backdrop_path} alt={movie.title} />
                     <div className="title">
                        <h1 className="movie-title">{movie.title}</h1>
                     </div>
                     <div className="content">
                        <div className="text-box">
                           <h1 className="movie-title">{movie.title}</h1>
                           <p className="movie-overview">
                              {isMobile ? (
                                 <>
                                    {expandedIndex === index
                                       ? movie.overview
                                       : movie.overview.slice(0, 100)}
                                    {movie.overview.length > 100 && (
                                       <button
                                          onClick={() =>
                                             setExpandedIndex(expandedIndex === index ? null : index)
                                          }
                                          className="read-toggle-inline"
                                       >
                                          {expandedIndex === index ? " Read Less" : "... Read More"}
                                       </button>
                                    )}
                                 </>
                              ) : (
                                 movie.overview
                              )}
                           </p>
                        </div>
                        <div className="footer">
                           <div className="category">
                              {movie.genres.map((genre, index) => (
                                 <span className="genre-span" key={index} style={{ "--i": index }}>
                                    {genre.name}
                                 </span>
                              ))}
                           </div>
                           <button onClick={() => { navigate(`/movies/${movie._id}`); scrollTo(0, 0) }} className="px-2 py-1.5 text-[0.65rem] sm:px-3 sm:py-2 sm:text-xs lg:px-4 lg:py-2.5 lg:text-sm bg-primary hover:bg-primary-dull hover:drop-shadow-[0_0px_8px_#D63854] transition duration-600 ease-in-out rounded-md font-medium cursor-pointer ">Book Now</button>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   )
}

export default MovieSection
