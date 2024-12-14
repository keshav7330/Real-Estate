import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules"

import "swiper/css";
import 'swiper/css/navigation';
import ListingItem from '../components/ListingItem';

const HomePage = () => {
  const [offerListings, setOfferListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  

  useEffect(()=>{
    const fetchOfferListings = async() => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=3")

        const data = await res.json()

        console.log(data);
        
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchOfferListings()

    const fetchRentListings = async() => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=3")

        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async() => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=3`)

        const data = await res.json()
        setSaleListings(data)
        
      } catch (error) {
        console.log(error);
      }
    }

    
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
      <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find Your Dream Home Today,Bringing homes closer to you.</h1>

      <div className="text-gray-500 text-xs sm:text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur, nisi.
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing.
      </div>
      <Link to={"/search"} className="text-xs sm:text-sm text-blue-950 font-bold hover:underline">
       Let's get started
      </Link>
    </div>
    <Swiper navigation={true} modules={[Navigation]}>
       {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
        <SwiperSlide>
          <div style={{
            background: `url(${listing.imageUrls[0]}) center no-repeat`,
            backgroundSize: "contain"
          }}

          className="h-[500px]"
          key={listing._id}
          ></div>
        </SwiperSlide>
       ))}        
    </Swiper>

    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      {offerListings && offerListings.length>0 && (
        <div>
          <div className="my-2">
            <h2 className="text-2xl font-semibold text-slate-700">recent offers</h2>

            <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}> Show more offers</Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

         {rentListings && rentListings.length>0 && (
        <div>
          <div className="my-2">
            <h2 className="text-2xl font-semibold text-slate-700">recent places for rent</h2>

            <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}> Show more places for rent</Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

        {saleListings && saleListings.length>0 && (
        <div>
          <div className="my-2">
            <h2 className="text-2xl font-semibold text-slate-700">recent places for sale</h2>

            <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=sale"}> Show more places for sale</Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>

    </div>
  
  )
}

export default HomePage