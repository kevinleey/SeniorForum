import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

function About() {
    return (
        <div id="page-background">
            <Navbar/>
            <div id="page-container">
                <h1 className="page-title">About</h1>
                <p>Alabama Caregiver Connect strives to connect people living with dementia in
                    Alabama and their families with the information and resources they need to support their health and
                    quality of life. This forum represents a partnership between Alabama Caregiver Connect and The
                    University of Alabama Retirement Association (TUARA) to provide retirees of the UA System an
                    opportunity to learn more from each other about dementia and caregiving. It is a secure space for
                    caregivers to support each other by asking and answering questions about about their caregiving
                    experiences. </p>

            </div>
        {/*<div>*/}
        {/*    <img className="about-pic" src="../images/aboutimage.jpg" alt="About Photo"/>*/}
        {/*</div>*/}
            <Footer/>
        </div>
    )
        ;
}

export default About;
