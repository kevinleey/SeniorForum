import React from "react";
import "../../styles/navbar.css";
import "../../styles/category-box.css"

function CategoryBox(props) {
    return (
        <div id="box-container">
            <div id="content-container">
                <img src="https://media.istockphoto.com/id/1344512181/vector/icon-red-loudspeaker.jpg?s=612x612&w=0&k=20&c=MSi3Z2La8OYjSY-pr0bB6f33NOuUKAQ_LBUooLhLQsk=" alt="Announcements"/>
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