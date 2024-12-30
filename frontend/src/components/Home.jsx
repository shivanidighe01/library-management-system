// import React from 'react'
import { IoSearch } from "react-icons/io5";
import '../styles/Home.css'
const Home = () => {
  return (
    <>
    <div className='home'>
        <div className='h'>
           <p> Why choose a <br></br><span>Library Management Software</span></p>
        </div>
        <div className='h'>
            <img src="https://jischoolerp.com/file/files/importance_of_librarry_maangent_system.jpg" alt="" />
        </div>
    </div>
    <div className="search">
      <h3>Browse Your Books</h3>
      <div className="search-box">
        <input type="text" placeholder='Searcg Book' />
        <IoSearch></IoSearch>
      </div>

    </div>
    </>
  )
}

export default Home