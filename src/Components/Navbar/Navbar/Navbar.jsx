import React, { useState } from 'react'
import classes from './Navbar.module.css'
import {  FaPhoneAlt } from 'react-icons/fa'
import search from "../../../Assets/search.png"
import logo from "../../../Assets/logo.png"
import BotttomNav from './BotttomNav'
import Sidebar from '../../Sidebar/Sidebar'

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false)

  // const sidebarHandler = () => {
  //   props.onSideberBtn(true)
  // }

  return (
    <>
    <header className={classes.navbar}>
       <div className={classes.nav_div}>
       <img src={logo}/>
      <div className={classes.search_bar}>
        <img src={search} alt="" />
        <input placeholder='Search Product and Services' type="text" 
          />
         
      </div>
       </div>
      <div className={classes.nav_body}>
          <div className={classes.nav_btn}>
          <FaPhoneAlt />
     <p>7989898789</p>
          </div>
         
        <button onClick={() => setSidebar(true)} className={classes.sidebar_open_btn}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
    </header>
    {sidebar && <Sidebar sidebar={sidebar} setSidebar={setSidebar} />}

    <BotttomNav/>
    </>
  )
}

export default Navbar