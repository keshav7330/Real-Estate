import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { app } from "../firebase.js"
import {
   getDownloadURL,
   getStorage, 
   ref,
   uploadBytesResumable 
  } from "firebase/storage"
import { 
  deleteUserFailure,
  deleteUserStart,
   deleteUserSuccess,
   signInStart,
   signOutUserFailure,
   signOutUserSuccess,
   updateUserFailure,
   updateUserStart, 
   updateUserSuccess
 } from "../../redux/user/userSlice.js"
import { Link } from "react-router-dom"

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)

  const fileRef = useRef(null)

  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploadError, setFileUploadError]  = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])

  const dispatch =useDispatch()

  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name 
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      // console.log("upload is " + progress + "% done")
      setFilePercentage(Math.round(progress))
      
    },
    (error) => {
      setFileUploadError(true)
    },

    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => 
      setFormData({
        ...formData,
        avatar: DownloadURL,
       })
     )
    }
   )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // console.log(formData);
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return 
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })

      const data = await res.json()

      if(data.success === false){
        deleteUserFailure(data.message)
        return
      }

      dispatch(deleteUserSuccess())
    } catch (error) {
      deleteUserFailure(error.message)
    }
  }

  const handleSignOut = async() => {
    try {
      dispatch(signInStart())

      const res =  await fetch("/api/auth/signout")
      const data = await res.json()

      if(data.success === false){
        signOutUserFailure(data.message)
        return
      }

      dispatch(signOutUserSuccess())
    } catch (error) {
      signOutUserFailure(error.message)
    }
  }

  const handleShowListings = async() => {
    try {
      setShowListingsError(false)

      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()

      if(data.success === false){
        setShowListingsError(true)
      }

      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) =>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE"
      })

      const data = await res.json()

      if(data.success === false){
        console.log(data.message);
        return  
      }

      setUserListings((prev) => 
        prev.filter((listing) => listing._id !== listingId)
      )
    } catch (error) {
      console.log(error.message);   
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
         type="file" 
         onChange={(e) => setFile(e.target.files[0])} 
         ref={fileRef}
         accept="image/*" 
         hidden 
        />

      <img 
      src={formData.avatar || currentUser.avatar} 
      alt="profile" 
      className="rounded-full w-28 h-28 object-cover cursor-pointer self-center mt-2"
      onClick={() => fileRef.current.click() }
      />

     <p className="self-center text-sm">
        {fileUploadError ? (
          <span>Error in image upload(image must be less than 2 mb)</span>
        ) :filePercentage > 0 && filePercentage < 100 ? (
          <span>{`Uploading ${filePercentage}%`}</span>
        ) : filePercentage === 100 ? (
          <span>Image Successfully uploaded</span>
        ) : ( 
          ""
          )}
     </p>
    
      <input 
       type="text"
       placeholder="username" 
       defaultValue={currentUser.username}
       id="username" 
       className="border rounded-lg p-3"
       onChange={handleChange}
     />

      <input 
       type="email" 
       placeholder="email" 
       defaultValue={currentUser.email}
       id="email" 
       className="border rounded-lg p-3" 
       onChange={handleChange}
      />

      <input 
      type="password" 
      placeholder="password" 
      id="password" 
      className="border rounded-lg p-3" 
      onChange={handleChange}
    />

      <button disabled={loading} 
      className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-40 disabled:opacity-80">
      {loading ? "loading..." : "Update"}
      </button>

       <Link to={"/create-listing"} className="bg-green-700 p-3 text-white text-center uppercase rounded-lg hover:opacity-55 disabled:opacity-80">Create Listing</Link>   
      </form>

      <div className=" flex justify-between mt-5">
      <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
      <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
    </div>

    <p className="text-red-700 mt-5">{error ? error : ""}</p>
    <p className="text-green-700 mt-5">
      {updateSuccess ? "User is updated successfully" : ""}
    </p>

    <button onClick={handleShowListings} className="text-green-700 w-full">
      Show Listings
    </button>

    <p className="text-red-700 text-sm">
      {showListingsError ? "Error in Show Listings.." : ""}
    </p>

    {userListings && userListings.length > 0 && (
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
        {userListings.map((listing) => (
          <div 
          key={listing._id} 
          className="flex justify-between border rounded-lg p-3 items-center gap4">
            <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain" />
            </Link>
            <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold hover:underline truncate flex-1">
            <p>{listing.name}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button 
              onClick={() => handleListingDelete(listing._id)} 
              className="text-red-700">
                Delete
              </button>

              <Link to={`/update-listing/${listing._id}`}>
                <button  className="text-green-700">Edit</button>
              </Link>

              
            </div>
          </div>
        ))}
      </div>
    )}

</div>
  )
}

export default Profile