import React from "react";
import "../styles/navbar.css";
import "../styles/category-box.css"

function CategoryBox(props) {
    return (
        <div id="box-container">
            <div id="content-container">
                <div id="category-title">
                    <h3>{props.title}</h3>
                </div>
            </div>
            <div id="thread-count">
                <h3>Threads Posted: </h3>
            </div>
        </div>
    );
}

export default CategoryBox;