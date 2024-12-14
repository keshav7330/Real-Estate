import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {

  const {currentUser} = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)

    urlParams.set("searchTerm", searchTerm)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get("searchTerm")

    urlParams.get(searchTermFromUrl)

    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }else{
      console.log("No search term from url");
      
    }
  }, [location.search])

  return (
    <header className="bg-slate-200 shadow-lg sticky">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

            <Link to={"/"}>
            <h1 className="font-bold text-sm items-center sm:text-lg flex flex-wrap">
                <span className="text-slate-500">Real</span>
                <span className="text-slate-900">Estate</span>
            </h1>
            </Link>

            <form className="p-3 bg-slate-100 rounded-lg flex items-center" onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="search.."  
                className="focus:outline-none bg-transparent w-24 sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

              <button>
              <FaSearch className="text-slate-600"/>
              </button>
 
            </form>

            <ul className="flex gap-2 sm:gap-3">
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/about"}>
                  <li>About</li>
                </Link>
                <Link to={"/profile"}>
                {currentUser ? (
                  <img src={currentUser.avatar} alt="profile pic"
                  className="rounded-full w-7 h-7 object-cover" />
                ) : (
                  <li 
                  className="text-slate-700 hover:underline">
                    Sign in</li>
                )}
                </Link>
                 
            </ul>    
        </div>
    </header>
  )
}

export default Header