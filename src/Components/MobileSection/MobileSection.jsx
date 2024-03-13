import React from 'react'
import pic1 from "../../Assets/pic1.png"
import pic2 from "../../Assets/pic2.png"
import pic3 from "../../Assets/pic3.png"
import mobile1 from "../../Assets/mobile1.png"
import mobile2 from "../../Assets/mobile2.png"
import Vector1 from "../../Assets/Vector1.png"
import Vector2 from "../../Assets/Vector2.png"
import classes from "./MobileSection.module.css"

const MobileSection = () => {
    return (
        <div id='mobile-section' className={classes.main_div}>
            <div className={`${classes.mob_div} `}>
                <img src={pic1} className={classes.mob} />
                <div className={classes.mob2}>
                    <h4>Buy your Favorite products</h4>
                    <p>Explore our product section for cutting-edge security devices. From advanced sensors to reliable GPS trackers, find the perfect tools to fortify your safety. Shop with confidence for peace of mind.</p>
                </div>
            <img src={Vector1}  className={classes.vector1}  />
            </div>
            <div className={classes.mob_div}>
                <div>
                    <h4>On demand surveillance</h4>
                    <p>Book surveillance at your convenience for only 150rs/hour with no monthly commitments. Pay only for what you use, ensuring flexibility and affordability tailored to your needs.</p>
                </div>
                <img src={pic2}  className={classes.mob}/>
            <img src={Vector2}  className={classes.vector2} />
            </div>
            <div className={classes.mob_div}>
                <img src={pic3}  className={classes.mob} />
                <div>
                    <h4>Monthly monitoring plans</h4>
                    <p>Get monthly surveillance packages for your business like jewellery shops or Home. Enjoy consistent security without any hassle or complications.We charge only for the hours you use.</p>
                </div>
            </div>
        </div>
    )
}

export default MobileSection