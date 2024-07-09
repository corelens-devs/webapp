// import React from 'react';
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import styles from './newpagination.module.css'


// const NewPagination = ({setPage, pageInfo }) => {

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > pageInfo.totalPages) {
//       return;
//     }
//     setPage(newPage);
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     for (let i = 1; i <= pageInfo.totalPages && i <= 6; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           disabled={i === pageInfo.page}
//           className={` ${styles.btn2} bg-white text-dark rounded-1 p-1`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div style={{display:"flex", justifyContent:"end", margin:"10px 0", gap:"5px"}}>
//       <button  className= {`${styles.btn1}`}
//         disabled={!pageInfo.hasPrevPage}
//         onClick={() => handlePageChange(pageInfo.prevPage)}
//       >
//        <MdKeyboardArrowLeft />

//       </button>
//       {renderPageNumbers()}
//       <button className={`${styles.btn1} `}
//         disabled={!pageInfo.hasNextPage}
//         onClick={() => handlePageChange(pageInfo.nextPage)}
//       >
//        <MdKeyboardArrowRight />

//       </button>
//     </div>
//   );
// };

// export default NewPagination;
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from './newpagination.module.css'

const NewPagination   = ({ setPage, pageInfo }) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageInfo?.totalPages) {
      return;
    }
    setPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const { totalPages, page } = pageInfo;
    let startPage, endPage;

    if (totalPages <= 6) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = 6;
      } else if (page + 2 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = page - 2;
        endPage = page + 3;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === page}
          className={` ${styles.btn2} bg-white text-dark rounded-1`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div style={{ display: "flex", justifyContent: "end", margin: "10px 0", gap: "5px" }}>
      <button
        className={`${styles.btn1}`}
        disabled={!pageInfo?.hasPrevPage}
        onClick={() => handlePageChange(pageInfo?.prevPage)}
      >
        <MdKeyboardArrowLeft />
      </button>
      {renderPageNumbers()}
      <button
        className={`${styles.btn1}`}
        disabled={!pageInfo?.hasNextPage}
        onClick={() => handlePageChange(pageInfo?.nextPage)}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default NewPagination;