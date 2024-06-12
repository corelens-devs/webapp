import React, { useState } from 'react'
import classes from './Layout.module.css'
import Navbar from '../../Components/Navbar/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

const Layout = (props) => {

  const [sidebar, setSidebar] = useState(false)

    const sidebarToggleHandler = () =>{
        sidebar===true?setSidebar(false):setSidebar(true)
    }
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (value) => {
      setSearchTerm(value);
    };

  return (
    <div className={classes.layout}>
        {/* <div className={`${classes.left} ${sidebar===true? classes.sidebar_true:''}`}>
            <Sidebar onSidebarBtn={sidebarToggleHandler} />
        </div> */}
        <div className={classes.right}>
            {/* <Navbar onSideberBtn={setSidebar} /> */}
            <Navbar onSearchChange={handleSearchChange}/>
          
            {props.children}
            <Footer/>
        </div>
    </div>
  )
}

export default Layout