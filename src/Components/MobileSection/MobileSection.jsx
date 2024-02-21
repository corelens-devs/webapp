import React from 'react'
import mobile1 from "../../Assets/mobile1.png"
import mobile2 from "../../Assets/mobile2.png"
import Vector1 from "../../Assets/Vector1.png"
import Vector2 from "../../Assets/Vector2.png"
import classes from "./MobileSection.module.css"

const MobileSection = () => {
    return (
        <div className={classes.main_div}>
            <div className={classes.mob_div}>
                <img src={mobile2} />
                <div>
                    <h4>Buy your Favorite CCTV Cameras</h4>
                    <p>You can also check your account balance through the net
                        banking facility. To use this facility need to login to the
                        official website of the concerned bank from your phone.</p>
                </div>
            </div>
            {/* <img src={Vector1} className={classes.img_mob1} /> */}
            <div className={classes.mob_div}>
                <div>
                    <h4>Buy Camera Surveillance</h4>
                    <p>You can also check your account balance through the net
                        banking facility. To use this facility need to login to the official
                        website of the concerned bank from your phone.</p>
                </div>
                <img src={mobile1}  />
            </div>
            {/* <img src={Vector2}/> */}
            <div className={classes.mob_div}>
                <img src={mobile2} />
                <div>
                    <h4>Customize your
                        profile from app.</h4>
                    <p>You can also check your account balance through the net
                        banking facility. To use this facility need to login to the
                        official website of the concerned bank from your phone.</p>
                </div>
            </div>
        </div>
    )
}

export default MobileSection