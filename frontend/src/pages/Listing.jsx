import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules"
import {
    FaBath, 
    FaBed, 
    FaChair, 
    FaMapMarkerAlt, 
    FaParking, 
    FaShare
} from 'react-icons/fa'
import { useSelector } from "react-redux"

import "swiper/css";
import 'swiper/css/navigation';
import Contact from './Contact';


const Listing = () => {
    const { currentUser } = useSelector((state) => state.user)
    const params = useParams()

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)
    const [contact, setContact] = useState(false)
     
    // SwiperCore.use([Navigation])


    useEffect(() => {
        const fetchListing = async() => {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)

                const data = await res.json()
                // console.log(data);
                

                if(data.success === false){
                    setLoading(false)
                    setError(true)
                    return
                }

                // console.log(data);
                

                setLoading(false)
                setError(false)
                setListing(data)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }

        fetchListing()
    }, [params.listingId])
  return (
    <main>
        {loading && <p className="text-center text-2xl my-7">Loading..</p>}

        {error && (
            <p className="text-center text-2xl my-7">Something went wrong</p>
        )}

        {listing && !loading && !error && 
        <div>
            <Swiper navigation={true} modules={[Navigation]}>
                {listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                        <div className="h-[500px] max-sm:h-[250px]" style={{
                            background: `url(${url}) center no-repeat`,
                            backgroundSize: "contain",
                        }}>
                            {/* {url} */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-200 cursor-pointer">
                <FaShare className="text-slate-500" 
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)

                    console.log("clciked");
                    setCopied(true)
                    setTimeout(() => {
                    setCopied(false)
                    }, 2000)    
                }} 
                />
            </div>
                {copied && (
                    <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                        Link Copied
                    </p>
                )}

                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                    <p className="text-2xl font-semibold">
                        {listing.name} {" "}
                        {`${listing.discountPrice}` > 0 ? (
                            <span className="text-green-800"> ₹ {listing.discountPrice} </span> 
                    ) : ( 
                        ""
                    )}  {" "}
                        {listing.discountPrice ? (
                        <span className="line-through text-sm text-red-700 ">
                             ₹{listing.regularPrice}
                             </span> 
                             ): (
                                <span className="text-green-800"> ₹ {listing.regularPrice} </span>
                              )}
                    </p>

                    <p className="text-slate-600 flex items-center mt-6 gap-2 text-sm">
                        <FaMapMarkerAlt className="text-green-700"/>
                        {listing.address}
                    </p> 

                    <div className="flex gap-4 ">
                        <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            {listing.type === "rent" ? "For rent" : "For Sale"}
                        </p>
                        {listing.offer && (
                            <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                ₹{+listing.regularPrice - +listing.discountPrice} OFF
                            </p>
                        )}
                    </div>
                    <p className="text-slate-600">
                        <span>Description - </span>
                        {listing.description}
                    </p>

                        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 ">
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBed className="text-lg"/>
                                {listing.bedrooms > 1 
                                ? `${listing.bedrooms} beds` 
                                : `${listing.bedrooms} bed`}
                            </li>

                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBath className="text-lg"/>
                                {listing.bedrooms > 1 
                                ? `${listing.bathrooms} baths` 
                                : `${listing.bathrooms} bath`}
                            </li>

                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaParking className="text-lg"/>
                                {listing.parking
                                ? "Parking Spot" 
                                : "No Parking"}
                            </li>

                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaChair className="text-lg"/>
                                {listing.furnished
                                ? "Furnished" 
                                : "Unfurnished"}
                            </li>
                        </ul>

                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button onClick={() => {
                                setContact(true)
                            }} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-70">
                                Contact Landlord
                            </button>
                        )}

                        {contact && <Contact listing={listing} />}
                </div>  
        </div>
        }
    </main> 
)
}

export default Listing