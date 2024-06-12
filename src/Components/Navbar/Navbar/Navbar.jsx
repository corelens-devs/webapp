// import React, { useRef, useState } from 'react'
// import classes from './Navbar.module.css'
// import { FaPhoneAlt } from 'react-icons/fa'
// import search from "../../../Assets/search.png"
// import logo from "../../../Assets/logo.png"
// import BotttomNav from './BotttomNav'
// import Sidebar from '../../Sidebar/Sidebar'
// import BottomNavSlider from './BtmNavSlider'

// const Navbar = (props) => {
//   const [sidebar, setSidebar] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     const text = searchTerm.trim().toLowerCase();

//     if (!text) return; // Do nothing if search term is empty

//     const elements = document.querySelectorAll('body *');

//     for (let element of elements) {
//       if (element.textContent.toLowerCase().includes(text)) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         element.classList.add(classes.highlighted); // Add a highlight class
//         setTimeout(() => {
//           element.classList.remove(classes.highlighted); // Remove highlight after a while
//         }, 2000);
//         break; // Stop searching once the first match is found
//       }
//     }

//     setSearchTerm(''); // Clear search input after search
//   };

//   return (
//     <>
// <header className={`${classes.navbar} shadow-sm `} onClick={() => sidebar && setSidebar(false)}>
//   <div className={classes.nav_div}>
//     <img src={logo} className={classes.nav_img} />
//     <div className={classes.search_bar}>
//             <img src={search} alt="" onClick={handleSearch} style={{ cursor: 'pointer' }}  />
//             <input
//               placeholder='Search Product and Services'
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Search on Enter key press
//             />
//           </div>
//         </div>
//     <div className={classes.nav_body}>


//       <div className={classes.nav_btn1}>
//         <div className='d-flex gap-2'>
//           <FaPhoneAlt />
//           <p className={classes.phn_res}>1800-313-4207</p>
//         </div>
//       </div>
//       <div className={classes.nav_btn}>
//         <FaPhoneAlt />
//         <p>1800-313-4207</p>
//       </div>

//     </div>
//   </header>

//   <BotttomNav />
//   <BottomNavSlider />
// </>
//   )
// }

// export default Navbar

import React, { useRef, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import search from "../../../Assets/search.png";
import logo from "../../../Assets/logo.png";
import BotttomNav from './BotttomNav';
import BottomNavSlider from './BtmNavSlider';
import classes from './Navbar.module.css'; // Example CSS for styling
import ProductSlider from '../../Products/ProductSlider';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearchChange, navv }) => {
  const [sidebar, setSidebar] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value); // Pass the search term to the parent component

  };
const navigate = useNavigate()

  return (
    <>
      <header className={`${classes.navbar} shadow-sm `} onClick={() => sidebar && setSidebar(false)}>
        <div className={classes.nav_div}>
          <img src={logo} className={classes.nav_img} onClick={()=>navigate('/')} />
          <div className={classes.search_bar}>
            <img src={search} alt="Search Icon" />
            <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={handleSearchChange}
      />
          </div>
        </div>
        <div className={classes.nav_body}>


          <div className={classes.nav_btn1}>
            <div className='d-flex gap-2'>
              <FaPhoneAlt />
              <p className={classes.phn_res}>1800-313-4207</p>
            </div>
          </div>
          <div className={classes.nav_btn}>
            <FaPhoneAlt />
            <p>1800-313-4207</p>
          </div>

        </div>
      </header>

    {navv &&   <>
      <BotttomNav />
      <BottomNavSlider />
    </>}
      {/* <ProductSlider searchTerm={searchTerm} /> */}

    </>
  );
};

export default Navbar;
