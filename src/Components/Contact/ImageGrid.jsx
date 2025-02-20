import React from "react";
import styles from "./ImageGrid.module.css";
import Photo1 from "../../Assets/delete-flow/Home.png";
import Photo2 from "../../Assets/delete-flow/profile.png";
import Photo3 from "../../Assets/delete-flow/delete_sure.jpg";
import Photo4 from "../../Assets/delete-flow/deleted.png";

const ImageGrid = () => {
  return (
    <div className={styles.imageGridContainer}>
      <div className={styles.header}>
        <h1>Account Deletion (Permanent)</h1>
        <p style={{ maxWidth: '650px', margin: '0 auto 30px auto'}}>You can follow the below steps in the app to delete your account! Please be careful as we cannot recover your account after this.</p>
      </div>
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <img src={Photo1} alt="Go to Profile on home screen" />
        </div>
        <div className={styles.gridItem}>
          <img src={Photo2} alt="Click on delete account" />
        </div>
        <div className={styles.gridItem}>
          <img src={Photo3} alt="Confirm delete" />
        </div>
        <div className={styles.gridItem}>
          <img src={Photo4} alt="Account deleted screen" />
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
