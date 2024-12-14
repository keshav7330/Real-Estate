import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [Landlord, setLandload] = useState(null)
    const [message, setMessage] = useState("")

    // console.log(listing.userRef);
    

    useEffect(() => {
        const fetchLandload = async() => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)

                const data = await res.json()
                setLandload(data)
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchLandload()
    }, [listing.userRef])

    const onChange = (e) => {
        setMessage(e.target.value)
    }
  return (
    <div>
        {Landlord && (
            <div className="flex flex-col gap-2">
                <p>Contact <span className="font-semibold text-red-900">{Landlord.username}</span>{" "}
                for <span className="font-semibold text-red-900">{listing.name.toLowerCase()}</span>
                </p>
                <textarea 
                name="message" 
                id="message" 
                rows={2} 
                value={message}
                onChange={onChange}
                placeholder="Enter your message here..." 
                className="w-full border rounded-lg p-3">
                </textarea>

                <Link to={`mailto: ${Landlord.email}?subject=Regarding ${listing.name} & body=${message}`} className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95"> Send message</Link>

            </div>
        )}
    </div>
  )
}

export default Contact